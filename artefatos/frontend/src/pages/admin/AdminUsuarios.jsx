import { useState, useEffect } from 'react';
import { getUsuarios, getStats, createUsuario } from '../../services/api';

const perfilCls = { Médico:'badge-info', Paciente:'badge-primary', 'Gestor Municipal':'badge-warning', Secretária:'badge-secondary', Administrador:'badge-danger' };

export default function AdminUsuarios() {
  const [modal, setModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', perfil: 'Paciente', senha: '', confirmarSenha: ''
  });

  async function loadData() {
    setLoading(true);
    try {
      const [userData, statsData] = await Promise.all([
        getUsuarios(),
        getStats('admin')
      ]);
      setUsuarios(userData || []);
      setStats(statsData || {});
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!formData.nome || !formData.email || !formData.cpf || !formData.senha) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    setSubmitting(true);
    try {
      await createUsuario({
        nome: formData.nome,
        email: formData.email,
        perfil: formData.perfil
      });
      setModal(false);
      setFormData({ nome: '', email: '', cpf: '', perfil: 'Paciente', senha: '', confirmarSenha: '' });
      await loadData();
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'var(--space-4)',marginBottom:'var(--space-6)'}}>
        <div><h1 className="page-title" style={{marginBottom:4}}>Gerenciar Usuários</h1><p className="page-subtitle" style={{margin:0}}>Cadastro e gerenciamento de usuários do sistema.</p></div>
        <button className="btn btn-primary" onClick={() => setModal(true)}><i className="fa-solid fa-user-plus"></i> Novo Usuário</button>
      </div>
      <div className="dashboard-grid" style={{marginBottom:'var(--space-6)'}}>
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-users"></i></div><div className="stat-label">Total de Usuários</div><div className="stat-value">{stats.usuarios || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-user-check"></i></div><div className="stat-label">Ativos</div><div className="stat-value">{stats.ativos || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-user-plus"></i></div><div className="stat-label">Novos este mês</div><div className="stat-value">{stats.novosMes || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon blue"><i className="fa-solid fa-user-doctor"></i></div><div className="stat-label">Médicos Cadastrados</div><div className="stat-value">{stats.medicos || 0}</div></div>
      </div>
      <div className="table-container animate-fade-in-up delay-2">
        <div className="table-header"><div className="table-search"><i className="fa-solid fa-search"></i><input type="text" placeholder="Buscar usuário..." /></div><div className="filter-bar"><select className="filter-select"><option value="">Todos os perfis</option><option>Médico</option><option>Paciente</option><option>Gestor Municipal</option><option>Secretária</option></select><select className="filter-select"><option value="">Status</option><option>Ativo</option><option>Inativo</option></select></div></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Criado em</th><th>Ações</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{textAlign:'center', padding:'var(--space-4)'}}>Carregando usuários...</td></tr>
            ) : usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td style={{color:'var(--clr-text-muted)'}}>#{u.id}</td>
                  <td><strong>{u.nome}</strong></td>
                  <td>{u.email}</td>
                  <td><span className={`badge ${perfilCls[u.perfil]||'badge-secondary'}`}>{u.perfil}</span></td>
                  <td><span className={`badge ${u.status==='Ativo'?'badge-success':'badge-danger'} badge-dot`}>{u.status}</span></td>
                  <td>{u.criado}</td>
                  <td><button className="btn btn-ghost btn-sm"><i className="fa-solid fa-pen"></i></button> <button className="btn btn-ghost btn-sm" style={{color:'var(--clr-danger)'}}><i className="fa-solid fa-trash"></i></button></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{textAlign:'center', padding:'var(--space-4)', color:'var(--clr-text-muted)'}}>Nenhum usuário encontrado.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      <div className={`modal-overlay${modal?' active':''}`}><div className="modal">
        <div className="modal-header"><h3>Cadastrar Novo Usuário</h3><button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><i className="fa-solid fa-xmark"></i></button></div>
        <div className="modal-body">
          <div className="form-group"><label className="form-label">Nome Completo <span className="required">*</span></label><input type="text" className="form-control" placeholder="Nome do usuário" value={formData.nome} onChange={(e)=>setFormData({...formData, nome: e.target.value})} /></div>
          <div className="form-group"><label className="form-label">E-mail <span className="required">*</span></label><input type="email" className="form-control" placeholder="email@exemplo.com" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">CPF <span className="required">*</span></label><input type="text" className="form-control" placeholder="000.000.000-00" value={formData.cpf} onChange={(e)=>setFormData({...formData, cpf: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Perfil <span className="required">*</span></label>
              <select className="form-control form-select" value={formData.perfil} onChange={(e)=>setFormData({...formData, perfil: e.target.value})}>
                <option>Paciente</option><option>Médico</option><option>Gestor Municipal</option><option>Secretária</option><option>Administrador</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Senha <span className="required">*</span></label><input type="password" className="form-control" placeholder="••••••••" value={formData.senha} onChange={(e)=>setFormData({...formData, senha: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Confirmar Senha <span className="required">*</span></label><input type="password" className="form-control" placeholder="••••••••" value={formData.confirmarSenha} onChange={(e)=>setFormData({...formData, confirmarSenha: e.target.value})} /></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleCreate} disabled={submitting}>
            <i className="fa-solid fa-user-plus"></i> {submitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </div></div>
    </>
  );
}    </>
  );
}
