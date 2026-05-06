import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats, getSolicitacoes, getNotificacoes } from '../../services/api';

export default function PacienteDashboard() {
  const [stats, setStats] = useState({});
  const [solicitacaoDestaque, setSolicitacaoDestaque] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, solData, notifData] = await Promise.all([
          getStats('paciente'),
          getSolicitacoes(),
          getNotificacoes()
        ]);
        setStats(statsData || {});
        setSolicitacaoDestaque(solData && solData.length > 0 ? solData[0] : null);
        setNotificacoes(notifData ? notifData.slice(0, 3) : []);
      } catch (error) {
        console.error("Erro ao carregar dashboard do paciente", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div style={{padding: 'var(--space-8)', textAlign: 'center'}}>Carregando dashboard...</div>;
  }

  return (
    <>
      <div style={{background:'var(--grad-primary)',borderRadius:'var(--radius-xl)',padding:'var(--space-8)',color:'#fff',marginBottom:'var(--space-6)',position:'relative',overflow:'hidden'}} className="animate-fade-in-up">
        <div style={{position:'relative',zIndex:1}}>
          <h1 style={{fontSize:'var(--text-2xl)',fontWeight:700,marginBottom:'var(--space-2)',color:'#fff'}}>Olá! 👋</h1>
          <p style={{opacity:.85,fontSize:'var(--text-md)',maxWidth:500}}>Acompanhe suas solicitações, consulte notificações e encontre unidades de saúde perto de você.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-clipboard-list"></i></div><div className="stat-label">Solicitações ativas</div><div className="stat-value">{stats.solicitacoes || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-check-circle"></i></div><div className="stat-label">Aprovadas</div><div className="stat-value">{stats.aprovadas || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-users-line"></i></div><div className="stat-label">Posição na fila</div><div className="stat-value">{stats.posicaoFila ? `#${stats.posicaoFila}` : '-'}</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon green"><i className="fa-solid fa-calendar-check"></i></div><div className="stat-label">Próxima consulta</div><div className="stat-value" style={{fontSize:'var(--text-lg)'}}>{stats.proximaConsulta || 'Nenhuma'}</div></div>
      </div>

      <div className="dashboard-grid-2">
        <div className="card animate-fade-in-up delay-2">
          <div className="card-header"><h3><i className="fa-solid fa-heart-pulse" style={{color:'var(--clr-primary)',marginRight:8}}></i> Solicitação em Destaque</h3></div>
          <div className="card-body">
            {solicitacaoDestaque ? (
              <>
                <div className="detail-info-grid" style={{marginBottom:'var(--space-5)'}}>
                  <div className="detail-info-item"><label>Procedimento</label><span>{solicitacaoDestaque.procedimento}</span></div>
                  <div className="detail-info-item"><label>Solicitação</label><span>{solicitacaoDestaque.id}</span></div>
                  <div className="detail-info-item"><label>Médico</label><span>{solicitacaoDestaque.medico}</span></div>
                  <div className="detail-info-item"><label>Prioridade</label><span>{solicitacaoDestaque.prioridade}</span></div>
                </div>
                <div className="status-progress">
                  <div className="status-step completed"><div className="step-dot"><i className="fa-solid fa-check"></i></div><div className="step-label">Solicitado</div></div>
                  <div className="status-step current"><div className="step-dot"><i className="fa-solid fa-hourglass-half"></i></div><div className="step-label">Em Análise</div></div>
                  <div className="status-step"><div className="step-dot">3</div><div className="step-label">Aprovado</div></div>
                </div>
              </>
            ) : (
              <div style={{textAlign:'center', padding: 'var(--space-6)', color:'var(--clr-text-muted)'}}>
                Nenhuma solicitação em andamento.
              </div>
            )}
            <div style={{textAlign:'center',marginTop:'var(--space-4)'}}><Link to="/paciente/solicitacoes" className="btn btn-secondary btn-sm"><i className="fa-solid fa-eye"></i> Ver todas solicitações</Link></div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-3">
          <div className="card" style={{marginBottom:'var(--space-5)'}}>
            <div className="card-header"><h3><i className="fa-solid fa-bell" style={{color:'var(--clr-accent)',marginRight:8}}></i> Notificações</h3><Link to="/paciente/notificacoes" className="btn btn-ghost btn-sm">Ver todas</Link></div>
            <div className="card-body" style={{padding:0}}>
              {notificacoes.length > 0 ? notificacoes.map((n, i) => (
                <div key={i} className="notif-item unread">
                  <div className="notif-icon" style={{background:'var(--clr-info-light)',color:'var(--clr-info)'}}><i className="fa-solid fa-bell"></i></div>
                  <div className="notif-text">
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-desc">{n.desc}</div>
                  </div>
                </div>
              )) : (
                <div style={{textAlign:'center', padding: 'var(--space-6)', color:'var(--clr-text-muted)'}}>
                  Nenhuma notificação recente.
                </div>
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Acesso Rápido</h3></div>
            <div className="card-body">
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
                <Link to="/paciente/locais" className="quick-action" style={{width:'100%'}}><div className="qa-icon" style={{background:'var(--clr-primary-light)',color:'var(--clr-primary)'}}><i className="fa-solid fa-map-location-dot"></i></div><div className="qa-text"><h4>Locais de Atendimento</h4><p>Encontre unidades de saúde</p></div></Link>
                <Link to="/paciente/notificacoes" className="quick-action" style={{width:'100%'}}><div className="qa-icon" style={{background:'var(--clr-accent-light)',color:'var(--clr-accent)'}}><i className="fa-solid fa-bell"></i></div><div className="qa-text"><h4>Notificações</h4><p>Gerencie seus alertas</p></div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
