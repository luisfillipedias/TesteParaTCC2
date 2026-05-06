// ============================================
// RegulaSUS — API Service
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Persistence simulation using localStorage
const getStoredUsers = () => {
  const stored = localStorage.getItem('regulasus_users');
  if (stored) return JSON.parse(stored);
  
  const initialUsers = [
    { id: 1, nome: 'Dr. Carlos Andrade', email: 'carlos@regulasus.gov.br', perfil: 'Médico', status: 'Ativo', criado: '15/04/2026' },
    { id: 2, nome: 'Maria Silva', email: 'maria@email.com', perfil: 'Paciente', status: 'Ativo', criado: '20/04/2026' },
    { id: 3, nome: 'Roberto Mendes', email: 'roberto@gestao.gov.br', perfil: 'Gestor Municipal', status: 'Ativo', criado: '02/05/2026' },
    { id: 4, nome: 'Ana Souza', email: 'ana@regulasus.gov.br', perfil: 'Secretária', status: 'Inativo', criado: '03/05/2026' },
  ];
  localStorage.setItem('regulasus_users', JSON.stringify(initialUsers));
  return initialUsers;
};

let mockUsers = getStoredUsers();

const cache = new Map();
const CACHE_TTL = 60 * 1000;

export async function apiGet(endpoint) {
  const now = Date.now();
  if (cache.has(endpoint)) {
    const { data, timestamp } = cache.get(endpoint);
    if (now - timestamp < CACHE_TTL) return data;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    cache.set(endpoint, { data, timestamp: now });
    return data;
  } catch (e) {
    throw e; // Let the caller handle fallbacks
  }
}

export async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    cache.clear();
    return response.json();
  } catch (e) {
    throw e;
  }
}

// ============================================
// Métodos de Integração com Mock Fallback
// ============================================

export async function getStats(role) {
  try {
    return await apiGet(`/stats/${role}`);
  } catch (error) {
    if (role === 'admin') {
      const users = getStoredUsers();
      return {
        usuarios: users.length,
        ativos: users.filter(u => u.status === 'Ativo').length,
        novosMes: 4,
        medicos: users.filter(u => u.perfil === 'Médico').length
      };
    }
    return {};
  }
}

export async function getUsuarios() {
  try {
    return await apiGet('/usuarios');
  } catch (error) {
    return getStoredUsers();
  }
}

export async function createUsuario(userData) {
  try {
    const res = await apiPost('/usuarios', userData);
    return res;
  } catch (error) {
    const users = getStoredUsers();
    const newUser = {
      ...userData,
      id: users.length + 1,
      status: 'Ativo',
      criado: new Date().toLocaleDateString('pt-BR')
    };
    const updated = [newUser, ...users];
    localStorage.setItem('regulasus_users', JSON.stringify(updated));
    cache.clear();
    return newUser;
  }
}

export async function mockLogin(cpf, password) {
  const credentials = {
    '12345678900': { pass: 'Med@2026!', route: '/medico' },
    '98765432101': { pass: 'Pac@2026!', route: '/paciente' },
    '45678901234': { pass: 'Ges@2026!', route: '/gestor' },
    '11122233344': { pass: 'Adm@2026!', route: '/admin/usuarios' },
  };
  const user = credentials[cpf];
  if (user && user.pass === password) return user.route;
  throw new Error('CPF ou senha inválidos.');
}

// Other methods...
export async function getSolicitacoes() { try { return await apiGet('/solicitacoes'); } catch { return []; } }
export async function getTransportes() { try { return await apiGet('/transportes'); } catch { return []; } }
export async function getLocais() { try { return await apiGet('/locais'); } catch { return []; } }
export async function getNotificacoes() { try { return await apiGet('/notificacoes'); } catch { return []; } }
export async function getHistorico() { try { return await apiGet('/historico'); } catch { return []; } }
export async function getAgenda() { try { return await apiGet('/agenda'); } catch { return []; } }
export async function getPacientes() { try { return await apiGet('/pacientes'); } catch { return []; } }
export async function getSistemaStatus() { try { return await apiGet('/sistema/status'); } catch { return null; } }
export async function getAuditoria() { try { return await apiGet('/auditoria'); } catch { return []; } }
