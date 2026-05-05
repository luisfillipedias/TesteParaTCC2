export default function GestorExportar() {
  const cards = [
    { icon:'fa-list-ol', bg:'var(--clr-primary-light)', color:'var(--clr-primary)', title:'Fila de Espera', desc:'Exportar lista completa da fila de procedimentos com prioridades e tempos.', btn:'Exportar CSV' },
    { icon:'fa-ambulance', bg:'var(--clr-secondary-light)', color:'var(--clr-secondary)', title:'Transportes', desc:'Relatório de transportes realizados, pendentes e cancelados.', btn:'Exportar CSV' },
    { icon:'fa-chart-pie', bg:'var(--clr-accent-light)', color:'var(--clr-accent)', title:'Indicadores', desc:'Exportar métricas e indicadores em formato PDF.', btn:'Exportar PDF' },
  ];
  return (
    <>
      <h1 className="page-title">Exportar Dados</h1>
      <p className="page-subtitle">Gere relatórios e exporte dados do sistema.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--space-5)'}}>
        {cards.map((c,i) => (
          <div className={`card animate-fade-in-up${i>0?` delay-${i}`:''}`} key={i} style={{cursor:'pointer'}} onClick={() => alert(`Relatório de ${c.title} gerado!`)}>
            <div className="card-body" style={{textAlign:'center',padding:'var(--space-8)'}}>
              <div style={{width:64,height:64,borderRadius:'var(--radius-xl)',background:c.bg,color:c.color,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-4)',fontSize:'var(--text-2xl)'}}><i className={`fa-solid ${c.icon}`}></i></div>
              <h3 style={{fontSize:'var(--text-md)',marginBottom:'var(--space-2)'}}>{c.title}</h3>
              <p style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',marginBottom:'var(--space-4)'}}>{c.desc}</p>
              <button className="btn btn-primary btn-sm"><i className="fa-solid fa-download"></i> {c.btn}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
