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

// Mock login — will be replaced by Spring Boot /api/auth/login
export function mockLogin(role) {
  const pages = {
    medico: '/medico',
    paciente: '/paciente',
    gestor: '/gestor',
    admin: '/admin/usuarios',
  };
  return pages[role] || '/paciente';
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
