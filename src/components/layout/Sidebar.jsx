import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSessionUser, clearSession } from '../../services/api';

const sidebarSections = {
  paciente: [
    {
      label: 'Minha Saúde',
      links: [
        { to: '/paciente', icon: 'fa-solid fa-grid-2', text: 'Início' },
        { to: '/paciente/solicitacoes', icon: 'fa-solid fa-clipboard-list', text: 'Minhas Solicitações', permission: 'Consultar status solicitação' },
        { to: '/paciente/notificacoes', icon: 'fa-solid fa-bell', text: 'Notificações' },
        { to: '/paciente/locais', icon: 'fa-solid fa-map-location-dot', text: 'Locais de Atendimento' },
      ]
    },
    {
      label: 'Suporte',
      links: [
        { to: '/paciente/ajuda', icon: 'fa-solid fa-circle-question', text: 'Ajuda' },
      ]
    }
  ],
  medico: [
    {
      label: 'Principal',
      links: [
        { to: '/medico', icon: 'fa-solid fa-grid-2', text: 'Dashboard' },
        { to: '/medico/nova-solicitacao', icon: 'fa-solid fa-plus-circle', text: 'Nova Solicitação', permission: 'Solicitar procedimento' },
        { to: '/medico/solicitacoes', icon: 'fa-solid fa-clipboard-list', text: 'Minhas Solicitações', permission: 'Consultar status solicitação' },
      ]
    },
    {
      label: 'Consultas',
      links: [
        { to: '/medico/historico', icon: 'fa-solid fa-clock-rotate-left', text: 'Histórico Paciente' },
        { to: '/medico/agenda', icon: 'fa-solid fa-calendar-check', text: 'Agenda' },
      ]
    }
  ],
  gestor: [
    {
      label: 'Gestão',
      links: [
        { to: '/gestor', icon: 'fa-solid fa-grid-2', text: 'Dashboard' },
        { to: '/gestor/fila', icon: 'fa-solid fa-list-ol', text: 'Fila de Procedimentos', permission: 'Gerenciar fila' },
        { to: '/gestor/transporte', icon: 'fa-solid fa-ambulance', text: 'Transporte', permission: 'Solicitar transporte' },
      ]
    },
    {
      label: 'Relatórios',
      links: [
        { to: '/gestor/indicadores', icon: 'fa-solid fa-chart-pie', text: 'Indicadores', permission: 'Monitorar indicadores' },
        { to: '/gestor/exportar', icon: 'fa-solid fa-file-export', text: 'Exportar Dados' },
      ]
    }
  ],
  admin: [
    {
      label: 'Administração',
      links: [
        { to: '/admin/usuarios', icon: 'fa-solid fa-users-gear', text: 'Gerenciar Usuários', permission: 'Cadastrar usuários' },
        { to: '/admin/permissoes', icon: 'fa-solid fa-shield-halved', text: 'Permissões', permission: 'Alterar permissões' },
        { to: '/admin/sistema', icon: 'fa-solid fa-server', text: 'Sistema', permission: 'Gerenciar sistema' },
      ]
    },
    {
      label: 'Logs',
      links: [
        { to: '/admin/auditoria', icon: 'fa-solid fa-clock-rotate-left', text: 'Auditoria', permission: 'Visualizar auditoria' },
      ]
    }
  ],
};

const roleLabels = {
  'Médico': 'Médico',
  'Paciente': 'Paciente',
  'Gestor Municipal': 'Gestor Municipal',
  'Gestor Estadual': 'Gestor Estadual',
  'Secretária': 'Secretária',
  'Administrador': 'Administrador',
};

function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Sidebar({ profile, isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const sections = sidebarSections[profile];
  if (!sections) return null;

  // Get real user data from session
  const sessionUser = getSessionUser();
  const userName = sessionUser?.nome || 'Usuário';
  const userRole = sessionUser?.perfil ? (roleLabels[sessionUser.perfil] || sessionUser.perfil) : profile;
  const userInitials = getInitials(userName);

  // Add CRM for medico
  const displayRole = sessionUser?.perfil === 'Médico' && sessionUser?.crm 
    ? `${userRole} · ${sessionUser.crm}` 
    : userRole;

  const isActive = (to) => {
    if (to === `/${profile}`) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    clearSession();
    navigate('/login');
  };

  // Lógica de filtragem por permissão
  const userPermissions = sessionUser?.permissions || {};
  
  const filteredSections = sections.map(section => ({
    ...section,
    links: section.links.filter(link => {
      // Se não exige permissão específica, mostra sempre
      if (!link.permission) return true;
      // Se exige, verifica se o usuário tem (padrão true se não definido no objeto para evitar quebra)
      return userPermissions[link.permission] !== false;
    })
  })).filter(section => section.links.length > 0); // Remove seções vazias

  return (
    <>
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        <Link to={profile === 'admin' ? '/admin/usuarios' : `/${profile}`} className="sidebar-brand" style={{textDecoration:'none', color:'inherit', padding: 'var(--space-4) var(--space-6)', display:'flex', alignItems:'center', gap:'var(--space-3)'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <img src="https://www.gov.br/++theme++padrao_govbr/static/img/favicon.ico" alt="Bandeira Brasil" style={{height: '24px', width: 'auto'}} />
          </div>
          <img src="/logo-regulasus.svg" alt="RegulaSUS Logo" style={{height: '36px', width: 'auto'}} />
        </Link>
        <Link to={`/${profile}/perfil`} className="sidebar-user" onClick={onClose} style={{textDecoration:'none', color:'inherit', display:'flex', alignItems:'center', cursor:'pointer'}}>
          <div className="user-avatar">{userInitials}</div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">{displayRole}</div>
          </div>
        </Link>
        <nav className="sidebar-nav">
          {filteredSections.map((section, i) => (
            <div key={i}>
              <div className="nav-section">{section.label}</div>
              {section.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={isActive(link.to) ? 'active' : ''}
                  onClick={onClose}
                >
                  <i className={link.icon}></i> {link.text}
                  {link.badge && <span className="nav-badge">{link.badge}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <a href="#" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Sair do sistema</a>
        </div>
      </aside>
      <div className="sidebar-overlay" onClick={onClose}></div>
    </>
  );
}
