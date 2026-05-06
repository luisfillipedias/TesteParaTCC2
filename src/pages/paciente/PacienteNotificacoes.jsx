import { useState, useEffect } from 'react';
import { getNotificacoes } from '../../services/api';

const iconMap = { success: { icon: 'fa-check-circle', bg: 'var(--clr-success-light)', color: 'var(--clr-success)' }, info: { icon: 'fa-ambulance', bg: 'var(--clr-info-light)', color: 'var(--clr-info)' }, warning: { icon: 'fa-arrow-trend-up', bg: 'var(--clr-warning-light)', color: 'var(--clr-warning)' }, danger: { icon: 'fa-file-circle-exclamation', bg: 'var(--clr-danger-light)', color: 'var(--clr-danger)' } };

export default function PacienteNotificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotificacoes() {
      try {
        const data = await getNotificacoes();
        setNotificacoes(data || []);
      } catch (error) {
        console.error("Erro ao buscar notificações", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotificacoes();
  }, []);

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--space-6)'}}>
        <div><h1 className="page-title" style={{marginBottom:4}}>Notificações</h1><p className="page-subtitle" style={{margin:0}}>Centro de alertas e avisos do sistema.</p></div>
        <button className="btn btn-ghost btn-sm"><i className="fa-solid fa-check-double"></i> Marcar todas como lidas</button>
      </div>
      <div className="card animate-fade-in-up">
        <div className="card-body" style={{padding:0}}>
          {loading ? (
            <div style={{textAlign:'center', padding: 'var(--space-8)'}}>Carregando notificações...</div>
          ) : notificacoes.length > 0 ? (
            notificacoes.map((n) => {
              const ic = iconMap[n.type] || iconMap.info;
              return (
                <div className={`notif-item${!n.read ? ' unread' : ''}`} key={n.id}>
                  <div className="notif-icon" style={{background:ic.bg,color:ic.color}}><i className={`fa-solid ${ic.icon}`}></i></div>
                  <div className="notif-text"><div className="notif-title">{n.title}</div><div className="notif-desc">{n.desc}</div></div>
                  <div className="notif-time">{n.time}</div>
                </div>
              );
            })
          ) : (
            <div style={{textAlign:'center', padding: 'var(--space-8)', color: 'var(--clr-text-muted)'}}>
              Nenhuma notificação encontrada.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
