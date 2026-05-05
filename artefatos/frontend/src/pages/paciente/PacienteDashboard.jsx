import { Link } from 'react-router-dom';
import { MOCK } from '../../data/mockData';

export default function PacienteDashboard() {
  const s = MOCK.stats.paciente;
  return (
    <>
      <div style={{background:'var(--grad-primary)',borderRadius:'var(--radius-xl)',padding:'var(--space-8)',color:'#fff',marginBottom:'var(--space-6)',position:'relative',overflow:'hidden'}} className="animate-fade-in-up">
        <div style={{position:'relative',zIndex:1}}>
          <h1 style={{fontSize:'var(--text-2xl)',fontWeight:700,marginBottom:'var(--space-2)',color:'#fff'}}>Olá, Maria! 👋</h1>
          <p style={{opacity:.85,fontSize:'var(--text-md)',maxWidth:500}}>Acompanhe suas solicitações, consulte notificações e encontre unidades de saúde perto de você.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-clipboard-list"></i></div><div className="stat-label">Solicitações ativas</div><div className="stat-value">{s.solicitacoes}</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-check-circle"></i></div><div className="stat-label">Aprovadas</div><div className="stat-value">{s.aprovadas}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-users-line"></i></div><div className="stat-label">Posição na fila</div><div className="stat-value">#{s.posicaoFila}</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon green"><i className="fa-solid fa-calendar-check"></i></div><div className="stat-label">Próxima consulta</div><div className="stat-value" style={{fontSize:'var(--text-lg)'}}>{s.proximaConsulta}</div></div>
      </div>

      <div className="dashboard-grid-2">
        <div className="card animate-fade-in-up delay-2">
          <div className="card-header"><h3><i className="fa-solid fa-heart-pulse" style={{color:'var(--clr-primary)',marginRight:8}}></i> Solicitação em Destaque</h3><span className="badge badge-warning badge-dot">Aguardando</span></div>
          <div className="card-body">
            <div className="detail-info-grid" style={{marginBottom:'var(--space-5)'}}>
              <div className="detail-info-item"><label>Procedimento</label><span>Consulta Cardiologia</span></div>
              <div className="detail-info-item"><label>Solicitação</label><span>#1204</span></div>
              <div className="detail-info-item"><label>Médico</label><span>Dr. Carlos Andrade</span></div>
              <div className="detail-info-item"><label>Prioridade</label><span className="badge badge-danger">Alta</span></div>
            </div>
            <div className="status-progress">
              <div className="status-step completed"><div className="step-dot"><i className="fa-solid fa-check"></i></div><div className="step-label">Solicitado</div></div>
              <div className="status-step completed"><div className="step-dot"><i className="fa-solid fa-check"></i></div><div className="step-label">Recebido</div></div>
              <div className="status-step current"><div className="step-dot"><i className="fa-solid fa-hourglass-half"></i></div><div className="step-label">Em Análise</div></div>
              <div className="status-step"><div className="step-dot">4</div><div className="step-label">Aprovado</div></div>
              <div className="status-step"><div className="step-dot">5</div><div className="step-label">Agendado</div></div>
            </div>
            <div style={{textAlign:'center',marginTop:'var(--space-4)'}}><Link to="/paciente/solicitacoes" className="btn btn-secondary btn-sm"><i className="fa-solid fa-eye"></i> Ver todas solicitações</Link></div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-3">
          <div className="card" style={{marginBottom:'var(--space-5)'}}>
            <div className="card-header"><h3><i className="fa-solid fa-bell" style={{color:'var(--clr-accent)',marginRight:8}}></i> Notificações</h3><Link to="/paciente/notificacoes" className="btn btn-ghost btn-sm">Ver todas</Link></div>
            <div className="card-body" style={{padding:0}}>
              <div className="notif-item unread"><div className="notif-icon" style={{background:'var(--clr-success-light)',color:'var(--clr-success)'}}><i className="fa-solid fa-check"></i></div><div className="notif-text"><div className="notif-title">Consulta aprovada</div><div className="notif-desc">Cardiologia — 10/05/2026</div></div><div className="notif-time">2h</div></div>
              <div className="notif-item unread"><div className="notif-icon" style={{background:'var(--clr-info-light)',color:'var(--clr-info)'}}><i className="fa-solid fa-ambulance"></i></div><div className="notif-text"><div className="notif-title">Transporte confirmado</div><div className="notif-desc">03/05 às 08:00</div></div><div className="notif-time">5h</div></div>
              <div className="notif-item"><div className="notif-icon" style={{background:'var(--clr-warning-light)',color:'var(--clr-warning)'}}><i className="fa-solid fa-arrow-up"></i></div><div className="notif-text"><div className="notif-title">Fila atualizada</div><div className="notif-desc">Posição #5 → #3</div></div><div className="notif-time">1d</div></div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Acesso Rápido</h3></div>
            <div className="card-body">
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-3)'}}>
                <Link to="/paciente/locais" className="quick-action" style={{width:'100%'}}><div className="qa-icon" style={{background:'var(--clr-primary-light)',color:'var(--clr-primary)'}}><i className="fa-solid fa-map-location-dot"></i></div><div className="qa-text"><h4>Locais de Atendimento</h4><p>Encontre unidades de saúde</p></div></Link>
                <Link to="/paciente/notificacoes" className="quick-action" style={{width:'100%'}}><div className="qa-icon" style={{background:'var(--clr-accent-light)',color:'var(--clr-accent)'}}><i className="fa-solid fa-bell"></i></div><div className="qa-text"><h4>Notificações</h4><p>3 novas notificações</p></div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
