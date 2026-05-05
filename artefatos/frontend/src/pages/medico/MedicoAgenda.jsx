export default function MedicoAgenda() {
  return (
    <>
      <h1 className="page-title">Agenda</h1>
      <p className="page-subtitle">Seus atendimentos e procedimentos agendados.</p>
      <div className="dashboard-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginBottom:'var(--space-6)'}}>
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-calendar-day"></i></div><div className="stat-label">Hoje</div><div className="stat-value">3</div><div className="stat-change" style={{color:'var(--clr-text-secondary)'}}>atendimentos agendados</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-calendar-week"></i></div><div className="stat-label">Esta Semana</div><div className="stat-value">12</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-calendar"></i></div><div className="stat-label">Este Mês</div><div className="stat-value">38</div></div>
      </div>
      <div className="card animate-fade-in-up delay-2">
        <div className="card-header"><h3><i className="fa-solid fa-calendar-check" style={{color:'var(--clr-primary)',marginRight:8}}></i> Próximos Atendimentos</h3></div>
        <div className="card-body" style={{padding:0}}>
          <div style={{padding:'var(--space-3) var(--space-5)',background:'var(--clr-bg)',fontWeight:600,fontSize:'var(--text-sm)',color:'var(--clr-primary)',borderBottom:'1px solid var(--clr-border)'}}><i className="fa-solid fa-calendar-day" style={{marginRight:8}}></i> Hoje — 04/05/2026 (Segunda-feira)</div>
          {[
            {icon:'fa-heart-pulse',bg:'var(--clr-primary-light)',c:'var(--clr-primary)',t:'Consulta Cardiologia — Maria da Silva',d:'Hospital Regional de BH · Sala 204',h:'08:00',st:'Confirmado',stC:'badge-success'},
            {icon:'fa-stethoscope',bg:'var(--clr-secondary-light)',c:'var(--clr-secondary)',t:'Retorno Clínico — João Pereira',d:'Hospital Regional de BH · Sala 204',h:'10:30',st:'Confirmado',stC:'badge-success'},
            {icon:'fa-notes-medical',bg:'var(--clr-accent-light)',c:'var(--clr-accent)',t:'Avaliação Pré-operatória — Ana Souza',d:'Hospital Regional de BH · Sala 108',h:'14:00',st:'Pendente',stC:'badge-warning'},
          ].map((a,i) => (
            <div className="notif-item" key={i}><div className="notif-icon" style={{background:a.bg,color:a.c}}><i className={`fa-solid ${a.icon}`}></i></div><div className="notif-text"><div className="notif-title">{a.t}</div><div className="notif-desc">{a.d}</div></div><div style={{textAlign:'right'}}><div style={{fontWeight:600,fontSize:'var(--text-sm)',color:'var(--clr-primary)'}}>{a.h}</div><span className={`badge ${a.stC} badge-dot`}>{a.st}</span></div></div>
          ))}
          <div style={{padding:'var(--space-3) var(--space-5)',background:'var(--clr-bg)',fontWeight:600,fontSize:'var(--text-sm)',color:'var(--clr-text-secondary)',borderBottom:'1px solid var(--clr-border)',borderTop:'1px solid var(--clr-border)'}}><i className="fa-solid fa-calendar-day" style={{marginRight:8}}></i> Amanhã — 05/05/2026 (Terça-feira)</div>
          {[
            {icon:'fa-user-check',bg:'var(--clr-primary-light)',c:'var(--clr-primary)',t:'Consulta Pneumologia — Rodrigo Alves',d:'Hospital Regional de BH · Sala 204',h:'09:00',st:'Confirmado',stC:'badge-success'},
            {icon:'fa-file-medical',bg:'var(--clr-info-light)',c:'var(--clr-info)',t:'Resultado de Exames — Carlos Lima',d:'Hospital Regional de BH · Sala 204',h:'11:00',st:'Confirmado',stC:'badge-success'},
          ].map((a,i) => (
            <div className="notif-item" key={i}><div className="notif-icon" style={{background:a.bg,color:a.c}}><i className={`fa-solid ${a.icon}`}></i></div><div className="notif-text"><div className="notif-title">{a.t}</div><div className="notif-desc">{a.d}</div></div><div style={{textAlign:'right'}}><div style={{fontWeight:600,fontSize:'var(--text-sm)',color:'var(--clr-primary)'}}>{a.h}</div><span className={`badge ${a.stC} badge-dot`}>{a.st}</span></div></div>
          ))}
        </div>
      </div>
    </>
  );
}
