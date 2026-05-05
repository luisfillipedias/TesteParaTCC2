// ============================================
// RegulaSUS — Auth.js
// Módulo de autenticação simulando Login Único gov.br
// ============================================

const SESSION_KEY = 'regulasus_session';

// Detectar caminho correto para API (root vs subfolder)
const _isSubfolder = ['medico', 'paciente', 'gestor', 'admin'].some(
  folder => window.location.pathname.includes('/' + folder + '/')
);
const AUTH_API_URL = _isSubfolder ? '../api/govbr-auth.json' : 'api/govbr-auth.json';

// ---------- LOGIN ----------
async function authLogin(cpfInput, senha) {
  try {
    const response = await fetch(AUTH_API_URL);
    if (!response.ok) throw new Error('Erro ao conectar com o servidor de autenticação.');
    
    const data = await response.json();
    // Normalizar CPF (apenas dígitos) para comparação
    const cpfDigits = cpfInput.replace(/\D/g, '');
    const usuario = data.usuarios.find(u => u.cpf.replace(/\D/g, '') === cpfDigits);

    if (!usuario) {
      return { 
        success: false, 
        error: data.error_responses.user_not_found.error_description 
      };
    }

    if (usuario.status !== 'ativo') {
      return { 
        success: false, 
        error: data.error_responses.account_inactive.error_description 
      };
    }

    if (usuario.senha !== senha) {
      return { 
        success: false, 
        error: data.error_responses.invalid_credentials.error_description 
      };
    }

    // Gerar token simulado (simula JWT do gov.br)
    const token = btoa(JSON.stringify({
      sub: usuario.sub,
      iss: data.api_info.base_url,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + data.token_response_template.expires_in,
      scope: data.token_response_template.scope,
      amr: usuario.amr,
      perfil: usuario.perfil
    }));

    // Salvar sessão
    const session = {
      token: token,
      token_type: data.token_response_template.token_type,
      expires_at: Date.now() + (data.token_response_template.expires_in * 1000),
      user: {
        id: usuario.id,
        sub: usuario.sub,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        perfil: usuario.perfil,
        perfil_label: usuario.perfil_label,
        crm: usuario.crm,
        initials: usuario.initials,
        nivel_confiabilidade: usuario.nivel_confiabilidade,
        unidade_vinculada: usuario.unidade_vinculada || null,
        especialidade: usuario.especialidade || null,
        orgao: usuario.orgao || null,
        cargo: usuario.cargo || null,
        cns: usuario.cns || null
      }
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return { success: true, user: session.user };
  } catch (err) {
    return { success: false, error: 'Erro de conexão com o servidor. Tente novamente.' };
  }
}

// ---------- LOGOUT ----------
function authLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  // Determinar caminho relativo para login
  const depth = window.location.pathname.split('/').filter(Boolean);
  const isInSubfolder = ['medico', 'paciente', 'gestor', 'admin'].some(
    folder => window.location.pathname.includes('/' + folder + '/')
  );
  window.location.href = isInSubfolder ? '../login.html' : 'login.html';
}

// ---------- GET SESSION ----------
function authGetSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    
    const session = JSON.parse(raw);
    
    // Verificar expiração do token
    if (session.expires_at && Date.now() > session.expires_at) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    
    return session;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

// ---------- GET USER ----------
function authGetUser() {
  const session = authGetSession();
  return session ? session.user : null;
}

// ---------- CHECK AUTH (proteção de rotas) ----------
function authCheckAccess(requiredRole) {
  const session = authGetSession();
  
  if (!session) {
    // Não autenticado — redireciona para login
    const isInSubfolder = ['medico', 'paciente', 'gestor', 'admin'].some(
      folder => window.location.pathname.includes('/' + folder + '/')
    );
    window.location.href = isInSubfolder ? '../login.html?error=session_expired' : 'login.html?error=session_expired';
    return false;
  }

  if (requiredRole && session.user.perfil !== requiredRole) {
    // Perfil não autorizado — redireciona para o dashboard correto do usuário
    const pages = {
      'medico': '../medico/dashboard.html',
      'paciente': '../paciente/dashboard.html',
      'gestor': '../gestor/dashboard.html',
      'admin': '../admin/usuarios.html'
    };
    const isInSubfolder = ['medico', 'paciente', 'gestor', 'admin'].some(
      folder => window.location.pathname.includes('/' + folder + '/')
    );
    const prefix = isInSubfolder ? '../' : '';
    const correctPage = {
      'medico': prefix + 'medico/dashboard.html',
      'paciente': prefix + 'paciente/dashboard.html',
      'gestor': prefix + 'gestor/dashboard.html',
      'admin': prefix + 'admin/usuarios.html'
    };
    window.location.href = correctPage[session.user.perfil] || (isInSubfolder ? '../login.html' : 'login.html');
    return false;
  }

  return true;
}

// ---------- POPULATE USER UI ----------
function authPopulateUI() {
  const user = authGetUser();
  if (!user) return;

  // Sidebar user info
  document.querySelectorAll('.user-avatar').forEach(el => {
    el.textContent = user.initials;
  });
  document.querySelectorAll('.user-name').forEach(el => {
    el.textContent = user.nome;
  });
  document.querySelectorAll('.user-role').forEach(el => {
    let roleText = user.perfil_label;
    if (user.crm) roleText += ' · ' + user.crm;
    el.textContent = roleText;
  });

  // Header avatar
  document.querySelectorAll('.header-avatar').forEach(el => {
    el.textContent = user.initials;
  });

  // Welcome message (paciente dashboard)
  const welcomeH1 = document.querySelector('.page-content h1[style]');
  if (welcomeH1 && welcomeH1.textContent.includes('Olá,')) {
    const firstName = user.nome.split(' ')[0].replace('Dr.', '').replace('Dra.', '').trim();
    welcomeH1.textContent = 'Olá, ' + firstName + '! 👋';
  }
}

// ---------- INIT AUTH ON PAGE LOAD ----------
function authInit() {
  // Determinar role requerido pelo atributo data no body
  const requiredRole = document.body.getAttribute('data-required-role');
  
  if (requiredRole) {
    // Página protegida — verificar acesso
    if (!authCheckAccess(requiredRole)) return;
    
    // Popular UI com dados do usuário
    authPopulateUI();
  }

  // Configurar botões de logout
  document.querySelectorAll('.sidebar-footer a').forEach(link => {
    if (link.textContent.includes('Sair')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        authLogout();
      });
    }
  });
}

// Auto-init quando o DOM carregar (para páginas protegidas)
document.addEventListener('DOMContentLoaded', () => {
  // Só faz auto-init se NÃO for a página de login (login cuida do próprio flow)
  if (!document.getElementById('loginBtn')) {
    authInit();
  }
});
