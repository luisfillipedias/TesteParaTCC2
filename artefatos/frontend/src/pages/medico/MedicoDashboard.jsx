import { Link } from 'react-router-dom';
import { MOCK } from '../../data/mockData';

export default function MedicoDashboard() {
  const s = MOCK.stats.medico;
  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Visão geral das suas solicitações e atividades recentes.</p>
      <div className="dashboard-grid">
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-clipboard-list"></i></div><div className="stat-label">Solicitações este mês</div><div className="stat-value">{s.solicitacoesMes}</div><div className="stat-change up"><i className="fa-solid fa-arrow-up"></i> +12% vs. mês anterior</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-check-circle"></i></div><div className="stat-label">Aprovadas</div><div className="stat-value">{s.aprovadas}</div><div className="stat-change up"><i className="fa-solid fa-arrow-up"></i> {s.taxa} taxa de aprovação</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-hourglass-half"></i></div><div className="stat-label">Pendentes</div><div className="stat-value">{s.pendentes}</div><div className="stat-change down"><i className="fa-solid fa-arrow-down"></i> -2 vs. semana anterior</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon blue"><i className="fa-solid fa-ambulance"></i></div><div className="stat-label">Transportes solicitados</div><div className="stat-value">6</div><div className="stat-change up"><i className="fa-solid fa-arrow-up"></i> +3 esta semana</div></div>
      </div>
      <div className="dashboard-grid-2">
        <div className="table-container animate-fade-in-up delay-2">
          <div className="table-header"><h3><i className="fa-solid fa-clock" style={{color:'var(--clr-primary)',marginRight:8}}></i> Solicitações Recentes</h3><Link to="/medico/solicitacoes" className="btn btn-ghost btn-sm">Ver todas <i className="fa-solid fa-arrow-right"></i></Link></div>
          <table className="data-table"><thead><tr><th>#</th><th>Paciente</th><th>Procedimento</th><th>Prioridade</th><th>Status</th></tr></thead>
            <tbody>
              {MOCK.solicitacoes.slice(0,5).map((s, i) => (<tr key={i}><td style={{color:'var(--clr-text-muted)'}}>{s.id}</td><td><strong>{s.paciente}</strong></td><td>{s.procedimento}</td><td><span className={`badge ${s.prioridade === 'Alta' ? 'badge-danger' : s.prioridade === 'Média' ? 'badge-info' : 'badge-secondary'}`}>{s.prioridade}</span></td><td><span className={`badge badge-dot ${s.status === 'Aguardando' ? 'badge-warning' : s.status === 'Aprovado' ? 'badge-success' : 'badge-info'}`}>{s.status}</span></td></tr>))}
            </tbody>
          </table>
        </div>
        <div className="animate-fade-in-up delay-3">
          <div className="card" style={{marginBottom:'var(--space-5)'}}>
            <div className="card-header"><h3>Ações Rápidas</h3></div>
            <div className="card-body"><div className="quick-actions">
              <Link to="/medico/nova-solicitacao" className="quick-action"><div className="qa-icon" style={{background:'var(--clr-primary-light)',color:'var(--clr-primary)'}}><i className="fa-solid fa-plus"></i></div><div className="qa-text"><h4>Novo Procedimento</h4><p>Solicitar procedimento</p></div></Link>
              <Link to="/medico/nova-solicitacao" className="quick-action"><div className="qa-icon" style={{background:'var(--clr-secondary-light)',color:'var(--clr-secondary)'}}><i className="fa-solid fa-ambulance"></i></div><div className="qa-text"><h4>Transporte</h4><p>Solicitar ambulância</p></div></Link>
              <Link to="/medico/historico" className="quick-action"><div className="qa-icon" style={{background:'var(--clr-accent-light)',color:'var(--clr-accent)'}}><i className="fa-solid fa-search"></i></div><div className="qa-text"><h4>Buscar Paciente</h4><p>Consultar histórico</p></div></Link>
              <Link to="/medico/solicitacoes" className="quick-action"><div className="qa-icon" style={{background:'#EDE9FE',color:'#7C3AED'}}><i className="fa-solid fa-list-check"></i></div><div className="qa-text"><h4>Minhas Solicitações</h4><p>Ver histórico</p></div></Link>
            </div></div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Atividade Recente</h3></div>
            <div className="card-body" style={{padding:0}}>
              <div className="notif-item unread"><div className="notif-icon" style={{background:'var(--clr-success-light)',color:'var(--clr-success)'}}><i className="fa-solid fa-check"></i></div><div className="notif-text"><div className="notif-title">Solicitação #1198 aprovada</div><div className="notif-desc">Cirurgia Ortopédica de João Pereira foi aprovada.</div></div><div className="notif-time">2h</div></div>
              <div className="notif-item"><div className="notif-icon" style={{background:'var(--clr-warning-light)',color:'var(--clr-warning)'}}><i className="fa-solid fa-clock"></i></div><div className="notif-text"><div className="notif-title">Aguardando documentação</div><div className="notif-desc">Paciente Ana Souza — exames pendentes.</div></div><div className="notif-time">5h</div></div>
              <div className="notif-item"><div className="notif-icon" style={{background:'var(--clr-info-light)',color:'var(--clr-info)'}}><i className="fa-solid fa-ambulance"></i></div><div className="notif-text"><div className="notif-title">Transporte T-0451 confirmado</div><div className="notif-desc">Maria da Silva — 03/05 às 08:00</div></div><div className="notif-time">1d</div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
