import { useState, useEffect } from 'react';
import { getAgenda, getStats } from '../../services/api';

export default function MedicoAgenda() {
  const [agenda, setAgenda] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgenda() {
      try {
        const [agendaData, statsData] = await Promise.all([
          getAgenda(),
          getStats('medico')
        ]);
        setAgenda(agendaData || []);
        setStats(statsData || {});
      } catch (error) {
        console.error("Erro ao buscar agenda", error);
      } finally {
        setLoading(false);
      }
    }
    loadAgenda();
  }, []);

  return (
    <>
      <h1 className="page-title">Agenda</h1>
      <p className="page-subtitle">Seus atendimentos e procedimentos agendados.</p>
      <div className="dashboard-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginBottom:'var(--space-6)'}}>
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-calendar-day"></i></div><div className="stat-label">Hoje</div><div className="stat-value">{stats.hoje || 0}</div><div className="stat-change" style={{color:'var(--clr-text-secondary)'}}>atendimentos agendados</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-calendar-week"></i></div><div className="stat-label">Esta Semana</div><div className="stat-value">{stats.semana || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-calendar"></i></div><div className="stat-label">Este Mês</div><div className="stat-value">{stats.mes || 0}</div></div>
      </div>
      <div className="card animate-fade-in-up delay-2">
        <div className="card-header"><h3><i className="fa-solid fa-calendar-check" style={{color:'var(--clr-primary)',marginRight:8}}></i> Próximos Atendimentos</h3></div>
        <div className="card-body" style={{padding:0}}>
          {loading ? (
            <div style={{padding:'var(--space-5)', textAlign:'center', color:'var(--clr-text-muted)'}}>Carregando agenda...</div>
          ) : agenda.length > 0 ? (
            agenda.map((dia, index) => (
              <div key={index}>
                <div style={{padding:'var(--space-3) var(--space-5)',background:'var(--clr-bg)',fontWeight:600,fontSize:'var(--text-sm)',color:'var(--clr-text-secondary)',borderBottom:'1px solid var(--clr-border)',borderTop: index > 0 ? '1px solid var(--clr-border)' : 'none'}}>
                  <i className="fa-solid fa-calendar-day" style={{marginRight:8}}></i> {dia.data}
                </div>
                {dia.atendimentos.map((a, i) => (
                  <div className="notif-item" key={i}>
                    <div className="notif-icon" style={{background:a.bg || 'var(--clr-primary-light)',color:a.c || 'var(--clr-primary)'}}><i className={`fa-solid ${a.icon || 'fa-notes-medical'}`}></i></div>
                    <div className="notif-text"><div className="notif-title">{a.titulo}</div><div className="notif-desc">{a.local}</div></div>
                    <div style={{textAlign:'right'}}><div style={{fontWeight:600,fontSize:'var(--text-sm)',color:'var(--clr-primary)'}}>{a.hora}</div><span className={`badge ${a.statusClass || 'badge-primary'} badge-dot`}>{a.status}</span></div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div style={{padding:'var(--space-5)', textAlign:'center', color:'var(--clr-text-muted)'}}>
              Nenhum atendimento agendado.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
