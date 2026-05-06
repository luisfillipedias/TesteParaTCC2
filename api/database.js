// ============================================
// RegulaSUS — Database (PostgreSQL Cloud)
// ============================================

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Usa a URL do Neon se disponível, senão volta para o local
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:123@localhost:5432/regulasus';

const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : false
});

// Helper for queries
async function query(text, params) {
  return pool.query(text, params);
}

// ============================================
// Create Tables
// ============================================

async function initDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      perfil TEXT NOT NULL,
      status TEXT DEFAULT 'Ativo',
      telefone TEXT DEFAULT '',
      crm TEXT DEFAULT '',
      especialidade TEXT DEFAULT '',
      unidade TEXT DEFAULT '',
      cns TEXT DEFAULT '',
      data_nascimento TEXT DEFAULT '',
      matricula TEXT DEFAULT '',
      criado_em TIMESTAMP DEFAULT NOW(),
      atualizado_em TIMESTAMP DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS permissoes (
      id SERIAL PRIMARY KEY,
      funcionalidade TEXT NOT NULL,
      perfil TEXT NOT NULL,
      permitido BOOLEAN DEFAULT FALSE,
      UNIQUE(funcionalidade, perfil)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS auditoria (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER,
      usuario_nome TEXT,
      perfil TEXT,
      acao TEXT NOT NULL,
      detalhes TEXT,
      ip TEXT DEFAULT '',
      data_hora TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log('✅ Tabelas verificadas no Banco em Nuvem');
}

// ============================================
// Seed — Initial Users
// ============================================

async function seedUsers() {
  const { rows } = await query('SELECT COUNT(*)::int as c FROM usuarios');
  if (rows[0].c > 0) return;

  const users = [
    {
      nome: 'Dr. Carlos Andrade',
      email: 'carlos@regulasus.gov.br',
      cpf: '12345678900',
      senha: bcrypt.hashSync('Med@2026!', 10),
      perfil: 'Médico',
      telefone: '(31) 99876-5432',
      crm: 'CRM-MG 12345',
      especialidade: 'Clínica Médica',
      unidade: 'Hospital Regional de BH',
    },
    {
      nome: 'Maria da Silva',
      email: 'maria@email.com',
      cpf: '98765432101',
      senha: bcrypt.hashSync('Pac@2026!', 10),
      perfil: 'Paciente',
      telefone: '(31) 98888-7777',
      cns: '898 0012 3456 7890',
      data_nascimento: '15/04/1968',
    },
    {
      nome: 'Roberto Mendes',
      email: 'roberto@gestao.gov.br',
      cpf: '45678901234',
      senha: bcrypt.hashSync('Ges@2026!', 10),
      perfil: 'Gestor Municipal',
      telefone: '(31) 97777-6666',
      matricula: 'MG-8890',
    },
    {
      nome: 'Admin Sistema',
      email: 'admin@regulasus.gov.br',
      cpf: '11122233344',
      senha: bcrypt.hashSync('Adm@2026!', 10),
      perfil: 'Administrador',
    }
  ];

  for (const u of users) {
    await query(
      `INSERT INTO usuarios (nome, email, cpf, senha, perfil, telefone, crm, especialidade, unidade, cns, data_nascimento, matricula)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [u.nome, u.email, u.cpf, u.senha, u.perfil, u.telefone||'', u.crm||'', u.especialidade||'', u.unidade||'', u.cns||'', u.data_nascimento||'', u.matricula||'']
    );
  }
  console.log('✅ Seed: Usuários criados na nuvem');
}

// ============================================
// Seed — Initial Permissions
// ============================================

async function seedPermissoes() {
  const { rows } = await query('SELECT COUNT(*)::int as c FROM permissoes');
  if (rows[0].c > 0) return;

  const funcionalidades = [
    'Consultar status solicitação',
    'Solicitar procedimento',
    'Solicitar transporte',
    'Gerenciar fila',
    'Monitorar indicadores',
    'Cadastrar usuários',
    'Alterar permissões',
    'Visualizar auditoria',
    'Gerenciar sistema',
  ];

  const perfis = ['Paciente', 'Médico', 'Gestor Municipal', 'Gestor Estadual', 'Secretária', 'Administrador'];

  const permMap = {
    'Consultar status solicitação':  [true, true, true, true, true, true],
    'Solicitar procedimento':        [false, true, false, false, false, true],
    'Solicitar transporte':          [false, true, true, false, false, true],
    'Gerenciar fila':                [false, false, true, true, false, true],
    'Monitorar indicadores':         [false, false, true, true, false, true],
    'Cadastrar usuários':            [false, false, false, false, false, true],
    'Alterar permissões':            [false, false, false, false, false, true],
    'Visualizar auditoria':          [false, false, false, false, false, true],
    'Gerenciar sistema':             [false, false, false, false, false, true],
  };

  for (const func of funcionalidades) {
    const values = permMap[func];
    for (let i = 0; i < perfis.length; i++) {
      await query(
        'INSERT INTO permissoes (funcionalidade, perfil, permitido) VALUES ($1, $2, $3)',
        [func, perfis[i], values[i]]
      );
    }
  }
}

// Run all seeds
async function setup() {
  try {
    await initDatabase();
    await seedUsers();
    await seedPermissoes();
    console.log('✅ Banco Cloud Pronto');
  } catch (err) {
    console.error('❌ Erro setup cloud:', err.message);
  }
}

module.exports = { pool, query, setup };
