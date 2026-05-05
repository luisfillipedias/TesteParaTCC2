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
