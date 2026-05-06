import { Link, useLocation } from 'react-router-dom';

const sidebarConfigs = {
  paciente: {
    user: { initials: 'MS', name: 'Maria Silva', role: 'Paciente' },
    sections: [
      {
        label: 'Minha Saúde',
        links: [
          { to: '/paciente', icon: 'fa-solid fa-grid-2', text: 'Início' },
          { to: '/paciente/solicitacoes', icon: 'fa-solid fa-clipboard-list', text: 'Minhas Solicitações' },
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
    ]
  },
  medico: {
    user: { initials: 'CA', name: 'Dr. Carlos Andrade', role: 'Médico · CRM-MG 12345' },
    sections: [
      {
        label: 'Principal',
        links: [
          { to: '/medico', icon: 'fa-solid fa-grid-2', text: 'Dashboard' },
          { to: '/medico/nova-solicitacao', icon: 'fa-solid fa-plus-circle', text: 'Nova Solicitação' },
          { to: '/medico/solicitacoes', icon: 'fa-solid fa-clipboard-list', text: 'Minhas Solicitações' },
        ]
      },
      {
        label: 'Consultas',
        links: [
          { to: '/medico/historico', icon: 'fa-solid fa-clock-rotate-left', text: 'Histórico Paciente' },
          { to: '/medico/agenda', icon: 'fa-solid fa-calendar-check', text: 'Agenda' },
        ]
      }
    ]
  },
  gestor: {
    user: { initials: 'RM', name: 'Roberto Mendes', role: 'Gestor Municipal' },
    sections: [
      {
        label: 'Gestão',
        links: [
          { to: '/gestor', icon: 'fa-solid fa-grid-2', text: 'Dashboard' },
          { to: '/gestor/fila', icon: 'fa-solid fa-list-ol', text: 'Fila de Procedimentos' },
          { to: '/gestor/transporte', icon: 'fa-solid fa-ambulance', text: 'Transporte' },
        ]
      },
      {
        label: 'Relatórios',
        links: [
          { to: '/gestor/indicadores', icon: 'fa-solid fa-chart-pie', text: 'Indicadores' },
          { to: '/gestor/exportar', icon: 'fa-solid fa-file-export', text: 'Exportar Dados' },
        ]
      }
    ]
  },
  admin: {
    user: { initials: 'AS', name: 'Admin Sistema', role: 'Administrador' },
    sections: [
      {
        label: 'Administração',
        links: [
          { to: '/admin/usuarios', icon: 'fa-solid fa-users-gear', text: 'Gerenciar Usuários' },
          { to: '/admin/permissoes', icon: 'fa-solid fa-shield-halved', text: 'Permissões' },
          { to: '/admin/sistema', icon: 'fa-solid fa-server', text: 'Sistema' },
        ]
      },
      {
        label: 'Logs',
        links: [
          { to: '/admin/auditoria', icon: 'fa-solid fa-clock-rotate-left', text: 'Auditoria' },
        ]
      }
    ]
  },
};

export default function Sidebar({ profile, isOpen, onClose }) {
  const location = useLocation();
  const config = sidebarConfigs[profile];
  if (!config) return null;

  const isActive = (to) => {
    if (to === `/${profile}`) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <>
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        <Link to={profile === 'admin' ? '/admin/usuarios' : `/${profile}`} className="sidebar-brand" style={{textDecoration:'none', color:'inherit'}}>
          <div className="brand-icon"><i className="fa-solid fa-heart-pulse"></i></div>
          <div className="brand-text">Regula<span>SUS</span></div>
        </Link>
        <Link to={`/${profile}/perfil`} className="sidebar-user" onClick={onClose} style={{textDecoration:'none', color:'inherit', display:'flex', alignItems:'center', cursor:'pointer'}}>
          <div className="user-avatar">{config.user.initials}</div>
          <div className="user-info">
            <div className="user-name">{config.user.name}</div>
            <div className="user-role">{config.user.role}</div>
          </div>
        </Link>
        <nav className="sidebar-nav">
          {config.sections.map((section, i) => (
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
          <Link to="/login"><i className="fa-solid fa-right-from-bracket"></i> Sair do sistema</Link>
        </div>
      </aside>
      <div className="sidebar-overlay" onClick={onClose}></div>
    </>
  );
}
