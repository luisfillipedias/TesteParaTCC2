// ============================================
// RegulaSUS — API Service
// Placeholder for future Spring Boot integration
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const cache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute

export async function apiGet(endpoint) {
  const now = Date.now();
  if (cache.has(endpoint)) {
    const { data, timestamp } = cache.get(endpoint);
    if (now - timestamp < CACHE_TTL) {
      return data;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  
  cache.set(endpoint, { data, timestamp: now });
  return data;
}

export async function apiPost(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  
  // Invalidate cache on post
  cache.clear();
  
  return response.json();
}

export async function mockLogin(cpf, password) {
  const credentials = {
    '12345678900': { pass: 'Med@2026!', route: '/medico' },
    '98765432101': { pass: 'Pac@2026!', route: '/paciente' },
    '45678901234': { pass: 'Ges@2026!', route: '/gestor' },
    '11122233344': { pass: 'Adm@2026!', route: '/admin/usuarios' },
  };

  const user = credentials[cpf];
  if (user && user.pass === password) {
    return user.route;
  }
  
  throw new Error('CPF ou senha inválidos. Verifique suas credenciais.');
}

// ============================================
// Métodos de Integração Futura (Retornam vazio em caso de erro na API)
// ============================================

let mockUsers = [
  { id: 1, nome: 'Dr. Carlos Andrade', email: 'carlos@regulasus.gov.br', perfil: 'Médico', status: 'Ativo', criado: '15/04/2026' },
  { id: 2, nome: 'Maria Silva', email: 'maria@email.com', perfil: 'Paciente', status: 'Ativo', criado: '20/04/2026' },
  { id: 3, nome: 'Roberto Mendes', email: 'roberto@gestao.gov.br', perfil: 'Gestor Municipal', status: 'Ativo', criado: '02/05/2026' },
  { id: 4, nome: 'Ana Souza', email: 'ana@regulasus.gov.br', perfil: 'Secretária', status: 'Inativo', criado: '03/05/2026' },
];

export async function getStats(role) {
  try {
    return await apiGet(`/stats/${role}`);
  } catch (error) {
    if (role === 'admin') {
      return {
        usuarios: mockUsers.length,
        ativos: mockUsers.filter(u => u.status === 'Ativo').length,
        novosMes: 4,
        medicos: mockUsers.filter(u => u.perfil === 'Médico').length
      };
    }
    console.warn(`Fallback: Retornando stats vazio para ${role} devido a erro na API.`);
    return {};
  }
}

export async function getSolicitacoes() {
  try {
    return await apiGet('/solicitacoes');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de solicitações.');
    return [];
  }
}

export async function getTransportes() {
  try {
    return await apiGet('/transportes');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de transportes.');
    return [];
  }
}

export async function getUsuarios() {
  try {
    return await apiGet('/usuarios');
  } catch (error) {
    return [...mockUsers];
  }
}

export async function createUsuario(userData) {
  try {
    const res = await apiPost('/usuarios', userData);
    return res;
  } catch (error) {
    const newUser = {
      ...userData,
      id: mockUsers.length + 1,
      status: 'Ativo',
      criado: new Date().toLocaleDateString('pt-BR')
    };
    mockUsers = [newUser, ...mockUsers];
    cache.clear(); // Important to refresh any cached user lists
    return newUser;
  }
}

export async function getLocais() {
  try {
    return await apiGet('/locais');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de locais.');
    return [];
  }
}

export async function getNotificacoes() {
  try {
    return await apiGet('/notificacoes');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de notificações.');
    return [];
  }
}

export async function getHistorico() {
  try {
    return await apiGet('/historico');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de histórico.');
    return [];
  }
}

export async function getAgenda() {
  try {
    return await apiGet('/agenda');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de agenda.');
    return [];
  }
}

export async function getPacientes() {
  try {
    return await apiGet('/pacientes');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de pacientes.');
    return [];
  }
}

export async function getSistemaStatus() {
  try {
    return await apiGet('/sistema/status');
  } catch (error) {
    console.warn('Fallback: Retornando status vazio.');
    return null;
  }
}

export async function getAuditoria() {
  try {
    return await apiGet('/auditoria');
  } catch (error) {
    console.warn('Fallback: Retornando lista vazia de auditoria.');
    return [];
  }
}
