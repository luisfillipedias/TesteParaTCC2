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

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (res.status === 401 || res.status === 403) {
    // Token expired or invalid — redirect to login
    clearSession();
    if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
      window.location.href = '/login';
    }
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erro ${res.status}`);
  }

  return res.json();
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
  return apiFetch('/usuarios/perfil', {
    method: 'PUT',
    body: JSON.stringify(data),
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

export async function getAuditoria(busca = '') {
  const qs = busca ? `?busca=${encodeURIComponent(busca)}` : '';
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
