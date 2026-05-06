import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getNotificacoes } from '../../services/api';

export default function TopHeader({ breadcrumbs, profile, onMenuToggle }) {
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    async function checkNotifications() {
      try {
        const notifs = await getNotificacoes();
        setHasUnread(notifs && notifs.some(n => !n.read));
      } catch (e) {
        console.error("Error checking notifications", e);
      }
    }
    checkNotifications();
  }, []);

  const configs = {
    paciente: { initials: 'MS', perfilLink: '/paciente/perfil', notifLink: '/paciente/notificacoes', showNotif: true },
    medico: { initials: 'CA', perfilLink: '/medico/perfil', showNotif: false },
    gestor: { initials: 'RM', perfilLink: '/gestor/perfil', showNotif: false },
    admin: { initials: 'AS', perfilLink: '/admin/perfil', showNotif: false },
  };
  const cfg = configs[profile] || configs.paciente;

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="breadcrumb">
          <Link to="/">RegulaSUS</Link>
          {breadcrumbs && breadcrumbs.map((b, i) => (
            <span key={i}>
              <span className="sep">/</span>
              {b.to ? <Link to={b.to}>{b.label}</Link> : <span className="current">{b.label}</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="header-right">
        {cfg.showNotif && (
          <Link to={cfg.notifLink} className="header-icon-btn notif-bell-btn" title="Notificações">
            <i className="fa-regular fa-bell"></i>
            {hasUnread && <span className="notif-dot"></span>}
          </Link>
        )}
        <Link to={cfg.perfilLink} className="header-avatar" title="Meu Perfil">{cfg.initials}</Link>
      </div>
    </header>
  );
}
