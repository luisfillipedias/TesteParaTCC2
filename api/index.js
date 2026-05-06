// ============================================
// RegulaSUS — Express API Server (PostgreSQL)
// ============================================

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { query, setup } = require('./database');
const { generateToken, authenticateToken, requireAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- INICIALIZAÇÃO DO BANCO ---
// Na Vercel, isso garante que as tabelas existam no primeiro acesso
setup().catch(err => console.error('❌ Falha no Setup do Banco:', err.message));

// --- API ROUTES ---

// Health Check (Para testar se o banco está respondendo)
app.get('/api/health', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({ 
      status: 'ok', 
      database: 'connected', 
      time: result.rows[0].now,
      node: process.version
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Helper: log audit
async function logAudit(userId, userName, perfil, acao, detalhes, ip) {
  await query(
    'INSERT INTO auditoria (usuario_id, usuario_nome, perfil, acao, detalhes, ip) VALUES ($1,$2,$3,$4,$5,$6)',
    [userId, userName, perfil, acao, detalhes, ip || '']
  );
}

// ============================================
// AUTH
// ============================================

app.post('/api/auth/login', async (req, res) => {
  try {
    const { cpf, senha } = req.body;
    if (!cpf || !senha) return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });

    const cleanCpf = cpf.replace(/\D/g, '');
    const { rows } = await query('SELECT * FROM usuarios WHERE cpf = $1', [cleanCpf]);
    const user = rows[0];

    if (!user) return res.status(401).json({ error: 'Este CPF não está cadastrado no sistema.' });
    if (user.status !== 'Ativo') return res.status(403).json({ error: 'Sua conta está inativa. Entre em contato com o suporte.' });
    if (!bcrypt.compareSync(senha, user.senha)) return res.status(401).json({ error: 'A senha informada está incorreta.' });

    const token = generateToken(user);
    const routeMap = { 'Médico':'/medico', 'Paciente':'/paciente', 'Gestor Municipal':'/gestor', 'Gestor Estadual':'/gestor', 'Secretária':'/gestor', 'Administrador':'/admin/usuarios' };

    // BUSCA PERMISSÕES REAIS DO USUÁRIO
    const permRes = await query('SELECT funcionalidade, permitido FROM permissoes WHERE perfil = $1', [user.perfil]);
    const permissions = {};
    permRes.rows.forEach(p => permissions[p.funcionalidade] = p.permitido);

    await logAudit(user.id, user.nome, user.perfil, 'Login', 'Login via CPF', req.ip);

    res.json({
      token, route: routeMap[user.perfil] || '/login',
      user: { 
        id:user.id, nome:user.nome, email:user.email, cpf:user.cpf, perfil:user.perfil, 
        telefone:user.telefone, crm:user.crm, especialidade:user.especialidade, 
        unidade:user.unidade, cns:user.cns, data_nascimento:user.data_nascimento, 
        matricula:user.matricula,
        permissions // ENVIA AS PERMISSÕES PARA O FRONTEND
      }
    });
  } catch (err) { console.error('Login error:', err); res.status(500).json({ error: 'Erro interno.' }); }
});

// ============================================
// USUARIOS
// ============================================

app.get('/api/usuarios', authenticateToken, async (req, res) => {
  try {
    const { busca, perfil, status } = req.query;
    let sql = 'SELECT id,nome,email,cpf,perfil,status,telefone,crm,especialidade,unidade,cns,data_nascimento,matricula,criado_em,atualizado_em FROM usuarios WHERE 1=1';
    const params = [];
    let idx = 1;

    if (busca) { sql += ` AND (nome ILIKE $${idx} OR email ILIKE $${idx+1} OR cpf ILIKE $${idx+2})`; const t=`%${busca}%`; params.push(t,t,t); idx+=3; }
    if (perfil) { sql += ` AND perfil = $${idx}`; params.push(perfil); idx++; }
    if (status) { sql += ` AND status = $${idx}`; params.push(status); idx++; }
    sql += ' ORDER BY id DESC';

    const { rows } = await query(sql, params);
    const formatted = rows.map(u => ({ ...u, criado: u.criado_em ? new Date(u.criado_em).toLocaleDateString('pt-BR') : '' }));
    res.json(formatted);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar usuários.' }); }
});

app.post('/api/usuarios', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { nome, email, cpf, perfil, senha, telefone, crm, especialidade, unidade, cns, data_nascimento, matricula } = req.body;
    if (!nome || !email || !cpf || !senha || !perfil) return res.status(400).json({ error: 'Campos obrigatórios: nome, email, cpf, senha, perfil.' });

    const cleanCpf = cpf.replace(/\D/g, '');
    const exists = await query('SELECT id FROM usuarios WHERE cpf = $1', [cleanCpf]);
    if (exists.rows.length > 0) return res.status(409).json({ error: 'CPF já cadastrado no sistema.' });

    const hashed = bcrypt.hashSync(senha, 10);
    const result = await query(
      `INSERT INTO usuarios (nome,email,cpf,senha,perfil,telefone,crm,especialidade,unidade,cns,data_nascimento,matricula)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [nome, email, cleanCpf, hashed, perfil, telefone||'', crm||'', especialidade||'', unidade||'', cns||'', data_nascimento||'', matricula||'']
    );

    await logAudit(req.user.id, req.user.nome, req.user.perfil, 'Criar Usuário', `Usuário "${nome}" (${perfil}) criado`, req.ip);
    const u = result.rows[0];
    res.status(201).json({ id:u.id, nome:u.nome, email:u.email, perfil:u.perfil, status:u.status, criado:new Date(u.criado_em).toLocaleDateString('pt-BR') });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao criar usuário.' }); }
});

app.put('/api/usuarios/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, perfil, status, telefone, crm, especialidade, unidade, cns, data_nascimento, matricula, senha } = req.body;

    const check = await query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (check.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const user = check.rows[0];

    let sql, params;
    if (senha) {
      sql = `UPDATE usuarios SET nome=$1,email=$2,perfil=$3,status=$4,telefone=$5,crm=$6,especialidade=$7,unidade=$8,cns=$9,data_nascimento=$10,matricula=$11,senha=$12,atualizado_em=NOW() WHERE id=$13 RETURNING *`;
      params = [nome||user.nome, email||user.email, perfil||user.perfil, status||user.status, telefone!=null?telefone:user.telefone, crm!=null?crm:user.crm, especialidade!=null?especialidade:user.especialidade, unidade!=null?unidade:user.unidade, cns!=null?cns:user.cns, data_nascimento!=null?data_nascimento:user.data_nascimento, matricula!=null?matricula:user.matricula, bcrypt.hashSync(senha,10), id];
    } else {
      sql = `UPDATE usuarios SET nome=$1,email=$2,perfil=$3,status=$4,telefone=$5,crm=$6,especialidade=$7,unidade=$8,cns=$9,data_nascimento=$10,matricula=$11,atualizado_em=NOW() WHERE id=$12 RETURNING *`;
      params = [nome||user.nome, email||user.email, perfil||user.perfil, status||user.status, telefone!=null?telefone:user.telefone, crm!=null?crm:user.crm, especialidade!=null?especialidade:user.especialidade, unidade!=null?unidade:user.unidade, cns!=null?cns:user.cns, data_nascimento!=null?data_nascimento:user.data_nascimento, matricula!=null?matricula:user.matricula, id];
    }

    const result = await query(sql, params);
    await logAudit(req.user.id, req.user.nome, req.user.perfil, 'Editar Usuário', `Usuário #${id} "${nome||user.nome}" atualizado`, req.ip);
    res.json(result.rows[0]);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao atualizar usuário.' }); }
});

app.delete('/api/usuarios/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const check = await query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (check.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });
    if (parseInt(id) === req.user.id) return res.status(400).json({ error: 'Você não pode excluir seu próprio usuário.' });

    const user = check.rows[0];
    await query('DELETE FROM usuarios WHERE id = $1', [id]);
    await logAudit(req.user.id, req.user.nome, req.user.perfil, 'Excluir Usuário', `Usuário #${id} "${user.nome}" (${user.perfil}) excluído`, req.ip);
    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao excluir usuário.' }); }
});

// Profile routes (must come BEFORE /:id to avoid conflict)
app.get('/api/usuarios/perfil', authenticateToken, async (req, res) => {
  try {
    const { rows } = await query('SELECT id,nome,email,cpf,perfil,status,telefone,crm,especialidade,unidade,cns,data_nascimento,matricula,criado_em FROM usuarios WHERE id=$1', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(rows[0]);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar perfil.' }); }
});

app.put('/api/usuarios/perfil', authenticateToken, async (req, res) => {
  try {
    const { nome, email, telefone, crm, especialidade, unidade, cns, data_nascimento, matricula } = req.body;
    const check = await query('SELECT * FROM usuarios WHERE id=$1', [req.user.id]);
    if (check.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const user = check.rows[0];

    const result = await query(
      `UPDATE usuarios SET nome=$1,email=$2,telefone=$3,crm=$4,especialidade=$5,unidade=$6,cns=$7,data_nascimento=$8,matricula=$9,atualizado_em=NOW() WHERE id=$10 RETURNING id,nome,email,cpf,perfil,status,telefone,crm,especialidade,unidade,cns,data_nascimento,matricula,criado_em`,
      [nome||user.nome, email||user.email, telefone!=null?telefone:user.telefone, crm!=null?crm:user.crm, especialidade!=null?especialidade:user.especialidade, unidade!=null?unidade:user.unidade, cns!=null?cns:user.cns, data_nascimento!=null?data_nascimento:user.data_nascimento, matricula!=null?matricula:user.matricula, req.user.id]
    );

    await logAudit(req.user.id, req.user.nome, req.user.perfil, 'Editar Perfil', 'Perfil atualizado', req.ip);
    res.json(result.rows[0]);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao atualizar perfil.' }); }
});

app.put('/api/usuarios/perfil/senha', authenticateToken, async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    if (!senhaAtual || !novaSenha) return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias.' });

    const { rows } = await query('SELECT * FROM usuarios WHERE id=$1', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });
    if (!bcrypt.compareSync(senhaAtual, rows[0].senha)) return res.status(401).json({ error: 'Sua senha atual está incorreta.' });
    if (novaSenha.length < 6) return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres.' });

    await query('UPDATE usuarios SET senha=$1,atualizado_em=NOW() WHERE id=$2', [bcrypt.hashSync(novaSenha,10), req.user.id]);
    await logAudit(req.user.id, req.user.nome, req.user.perfil, 'Alterar Senha', 'Senha alterada pelo usuário', req.ip);
    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao processar a troca de senha.' }); }
});

// ============================================
// STATS
// ============================================

app.get('/api/stats/admin', authenticateToken, async (req, res) => {
  try {
    const total = (await query('SELECT COUNT(*)::int as c FROM usuarios')).rows[0].c;
    const ativos = (await query("SELECT COUNT(*)::int as c FROM usuarios WHERE status='Ativo'")).rows[0].c;
    const medicos = (await query("SELECT COUNT(*)::int as c FROM usuarios WHERE perfil='Médico'")).rows[0].c;
    const novosMes = (await query("SELECT COUNT(*)::int as c FROM usuarios WHERE criado_em >= date_trunc('month', NOW())")).rows[0].c;
    res.json({ usuarios:total, ativos, novosMes, medicos });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar estatísticas.' }); }
});

// ============================================
// PERMISSIONS
// ============================================

app.get('/api/permissoes', authenticateToken, async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM permissoes ORDER BY funcionalidade, perfil');
    const grouped = {};
    for (const r of rows) {
      if (!grouped[r.funcionalidade]) grouped[r.funcionalidade] = {};
      grouped[r.funcionalidade][r.perfil] = r.permitido;
    }
    const perfis = ['Paciente','Médico','Gestor Municipal','Gestor Estadual','Secretária','Administrador'];
    const result = Object.entries(grouped).map(([func, perms]) => ({
      funcionalidade: func,
      permissoes: perfis.map(p => ({ perfil:p, permitido:!!perms[p] }))
    }));
    res.json({ perfis, permissoes: result });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar permissões.' }); }
});

app.put('/api/permissoes', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { funcionalidade, perfil, permitido } = req.body;
    if (!funcionalidade || !perfil) return res.status(400).json({ error: 'Funcionalidade e perfil são obrigatórios.' });
    await query('UPDATE permissoes SET permitido=$1 WHERE funcionalidade=$2 AND perfil=$3', [!!permitido, funcionalidade, perfil]);
    await logAudit(req.user.id, req.user.nome, req.user.perfil, 'Alterar Permissão', `"${funcionalidade}" para ${perfil}: ${permitido?'Permitido':'Negado'}`, req.ip);
    res.json({ message: 'Permissão atualizada.' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao atualizar permissão.' }); }
});

// ============================================
// AUDITORIA
// ============================================

app.get('/api/auditoria', authenticateToken, async (req, res) => {
  try {
    const { busca } = req.query;
    let sql = 'SELECT * FROM auditoria';
    const params = [];
    if (busca) { sql += ' WHERE (usuario_nome ILIKE $1 OR acao ILIKE $2 OR detalhes ILIKE $3)'; const t=`%${busca}%`; params.push(t,t,t); }
    sql += ' ORDER BY id DESC LIMIT 200';

    const { rows } = await query(sql, params);
    const cls = { 'Médico':'badge-info', 'Paciente':'badge-primary', 'Gestor Municipal':'badge-warning', 'Gestor Estadual':'badge-warning', 'Secretária':'badge-secondary', 'Administrador':'badge-danger' };
    const formatted = rows.map(l => ({ dt: l.data_hora ? new Date(l.data_hora).toLocaleString('pt-BR') : '', user: l.usuario_nome||'Sistema', perfil: l.perfil||'', cls: cls[l.perfil]||'badge-secondary', acao: l.acao, det: l.detalhes||'' }));
    res.json(formatted);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar auditoria.' }); }
});

app.get('/api/notificacoes', authenticateToken, async (req, res) => {
  res.json([]); // Retorna vazio por enquanto para evitar 404
});

// ============================================
// SISTEMA STATUS
// ============================================

app.get('/api/sistema/status', authenticateToken, async (req, res) => {
  try {
    let totalUsers = 0, totalAtivos = 0, totalAuditoria = 0, lastAct = null;
    
    // Consultas individuais para que uma falha não derrube tudo
    try {
      const uRes = await query('SELECT COUNT(*)::int as c FROM usuarios');
      totalUsers = uRes.rows[0].c;
      const aRes = await query("SELECT COUNT(*)::int as c FROM usuarios WHERE status='Ativo'");
      totalAtivos = aRes.rows[0].c;
    } catch (e) { console.warn('Status erro usuários:', e); }

    try {
      const audRes = await query('SELECT COUNT(*)::int as c FROM auditoria');
      totalAuditoria = audRes.rows[0].c;
      const actRes = await query('SELECT data_hora FROM auditoria ORDER BY id DESC LIMIT 1');
      lastAct = actRes.rows[0];
    } catch (e) { console.warn('Status erro auditoria:', e); }

    const uptimeS = process.uptime();
    const h = Math.floor(uptimeS/3600); const m = Math.floor((uptimeS%3600)/60);
    const uptime = h > 0 ? `${h}h ${m}min` : `${m}min`;

    let pgVersion = 'PostgreSQL';
    try {
      const vRes = await query('SELECT version()');
      pgVersion = vRes.rows[0].version.split(' ').slice(0,2).join(' ');
    } catch (e) { console.warn('Status erro pg version:', e); }

    let dbSize = 'N/A';
    try {
      const sizeRes = await query("SELECT pg_size_pretty(pg_database_size(current_database())) as size");
      dbSize = sizeRes.rows[0].size;
    } catch (e) { console.warn('Status erro db size:', e); }

    res.json({
      status: 'Online', versao: 'v1.0.0', uptime,
      configs: [
        { label:'Ambiente', desc:'Modo de execução', badge: process.env.NODE_ENV||'production', cls:'badge-info' },
        { label:'Banco de Dados', desc:'Engine de persistência', value: pgVersion },
        { label:'Tamanho do Banco', desc:'Espaço utilizado', value: dbSize },
        { label:'Total de Usuários', desc:'Cadastrados no sistema', value: String(totalUsers) },
        { label:'Usuários Ativos', desc:'Status ativo', value: String(totalAtivos) },
        { label:'Registros de Auditoria', desc:'Total de logs', value: String(totalAuditoria) },
        { label:'Última Atividade', desc:'Log mais recente', value: lastAct ? new Date(lastAct.data_hora).toLocaleString('pt-BR') : 'Nenhuma' },
        { label:'Status da Conexão', desc:'Conexão com Neon/Postgres', badge: 'Ativa', cls: 'badge-success' }
      ]
    });
  } catch (err) { 
    console.error('Fatal status error:', err); 
    res.json({ 
      status: 'Limitado', versao: 'v1.0.0', uptime: 'N/A',
      configs: [{ label:'Erro', desc:'Falha ao carregar métricas', value:'Servidor online, mas banco de dados ocupado.' }]
    }); 
  }
});

// ============================================
// START
// ============================================

// Apenas inicia o servidor se for executado diretamente (local)
// Na Vercel, o app é exportado para ser usado como Serverless Function
if (require.main === module) {
  async function start() {
    try {
      await setup();
      app.listen(PORT, () => {
        console.log(`\n🚀 RegulaSUS API rodando em http://localhost:${PORT}`);
        console.log(`📦 Banco: PostgreSQL`);
      });
    } catch (err) {
      console.error('❌ Falha ao iniciar servidor:', err.message);
      process.exit(1);
    }
  }
  start();
}

module.exports = app;
