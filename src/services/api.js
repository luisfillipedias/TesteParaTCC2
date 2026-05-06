// ============================================
// RegulaSUS — API Service (Real Backend)
// ============================================

const API_BASE = '/api';

// ============================================
// Session helpers
// ============================================

export function getToken() {
  return sessionStorage.getItem('regulasus_token');
}

export function getSessionUser() {
  const data = sessionStorage.getItem('regulasus_user');
  return data ? JSON.parse(data) : null;
}

export function setSession(token, user) {
  sessionStorage.setItem('regulasus_token', token);
  sessionStorage.setItem('regulasus_user', JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem('regulasus_token');
  sessionStorage.removeItem('regulasus_user');
}

// ============================================
// Fetch wrapper with JWT
// ============================================

async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  } catch (err) {
    console.error('Network Error:', err);
    throw new Error('Falha de conexão com o servidor. Verifique sua internet.');
  }

  if (response.status === 401 || response.status === 403) {
    if (!endpoint.includes('/auth/login')) {
      clearSession();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login?session=expired';
      }
      throw new Error('Sessão expirada ou acesso negado. Faça login novamente.');
    }
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('API Error:', data);
    throw new Error(data.error || `Erro ${response.status}: Ocorreu um erro na requisição.`);
  }

  return data;
}

// ============================================
// Auth
// ============================================

export async function login(cpf, senha) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ cpf, senha }),
  });
  setSession(data.token, data.user);
  return data.route;
}

// ============================================
// Usuarios
// ============================================

export async function getUsuarios(filters = {}) {
  const params = new URLSearchParams();
  if (filters.busca) params.set('busca', filters.busca);
  if (filters.perfil) params.set('perfil', filters.perfil);
  if (filters.status) params.set('status', filters.status);
  const qs = params.toString();
  return apiFetch(`/usuarios${qs ? '?' + qs : ''}`);
}

export async function createUsuario(userData) {
  return apiFetch('/usuarios', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function updateUsuario(id, userData) {
  return apiFetch(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export async function deleteUsuario(id) {
  return apiFetch(`/usuarios/${id}`, {
    method: 'DELETE',
  });
}

// ============================================
// Perfil (own profile)
// ============================================

export async function getPerfil() {
  return apiFetch('/usuarios/perfil');
}

export async function updatePerfil(data) {
  // Limpa as máscaras antes de enviar para o banco
  const cleanData = { ...data };
  if (cleanData.telefone) cleanData.telefone = cleanData.telefone.replace(/\D/g, '');
  if (cleanData.cns) cleanData.cns = cleanData.cns.replace(/\D/g, '');
  if (cleanData.cpf) cleanData.cpf = cleanData.cpf.replace(/\D/g, '');

  return apiFetch('/usuarios/perfil', {
    method: 'PUT',
    body: JSON.stringify(cleanData),
  });
}

export async function changePassword(senhaAtual, novaSenha) {
  return apiFetch('/usuarios/perfil/senha', {
    method: 'PUT',
    body: JSON.stringify({ senhaAtual, novaSenha }),
  });
}

// ============================================
// Stats
// ============================================

export async function getStats(role) {
  return apiFetch(`/stats/${role}`);
}

// ============================================
// Permissoes
// ============================================

export async function getPermissoes() {
  return apiFetch('/permissoes');
}

export async function updatePermissao(funcionalidade, perfil, permitido) {
  return apiFetch('/permissoes', {
    method: 'PUT',
    body: JSON.stringify({ funcionalidade, perfil, permitido }),
  });
}

// ============================================
// Auditoria
// ============================================

export async function getAuditoria(filters = {}) {
  const params = new URLSearchParams();
  if (filters.busca) params.append('busca', filters.busca);
  if (filters.perfil) params.append('perfil', filters.perfil);
  if (filters.acao) params.append('acao', filters.acao);
  const qs = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/auditoria${qs}`);
}

// ============================================
// Sistema
// ============================================

export async function getSistemaStatus() {
  return apiFetch('/sistema/status');
}

// ============================================
// Other endpoints (placeholders for future)
// ============================================

export async function getSolicitacoes() { try { return await apiFetch('/solicitacoes'); } catch { return []; } }
export async function getTransportes() { try { return await apiFetch('/transportes'); } catch { return []; } }
export async function getLocais() { try { return await apiFetch('/locais'); } catch { return []; } }
export async function getNotificacoes() { try { return await apiFetch('/notificacoes'); } catch { return []; } }
export async function getHistorico() { try { return await apiFetch('/historico'); } catch { return []; } }
export async function getAgenda() { try { return await apiFetch('/agenda'); } catch { return []; } }
export async function getPacientes() { try { return await apiFetch('/pacientes'); } catch { return []; } }
