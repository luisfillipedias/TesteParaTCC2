// ============================================
// RegulaSUS — API Service
// Placeholder for future Spring Boot integration
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export async function apiPost(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
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

export async function getStats(role) {
  try {
    return await apiGet(`/stats/${role}`);
  } catch (error) {
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
    console.warn('Fallback: Retornando lista vazia de usuários.');
    return [];
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
