export default function AdminSistema() {
  const configs = [
    { label:'Protocolo de Segurança', desc:'HTTPS/TLS 1.3', badge:'Ativo', cls:'badge-success' },
    { label:'Capacidade Simultânea', desc:'Máximo de conexões ativas', value:'2.000 usuários' },
    { label:'Tempo de Resposta', desc:'Requisito: < 4 segundos', badge:'1.2s (média)', cls:'badge-success' },
    { label:'Banco de Dados', desc:'PostgreSQL 15', badge:'Conectado', cls:'badge-success' },
    { label:'Conformidade LGPD', desc:'Lei Geral de Proteção de Dados', badge:'Conforme', cls:'badge-success' },
  ];
  return (
    <>
      <h1 className="page-title">Informações do Sistema</h1>
      <p className="page-subtitle">Status e configurações do RegulaSUS.</p>
      <div className="dashboard-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginBottom:'var(--space-6)'}}>
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-circle-check"></i></div><div className="stat-label">Status</div><div className="stat-value" style={{color:'var(--clr-success)',fontSize:'var(--text-lg)'}}>Online</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-code-branch"></i></div><div className="stat-label">Versão</div><div className="stat-value" style={{fontSize:'var(--text-lg)'}}>v1.0.1</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-clock"></i></div><div className="stat-label">Uptime</div><div className="stat-value" style={{fontSize:'var(--text-lg)'}}>99.8%</div></div>
      </div>
      <div className="card animate-fade-in-up delay-2">
        <div className="card-header"><h3><i className="fa-solid fa-server" style={{color:'var(--clr-primary)',marginRight:8}}></i> Configurações</h3></div>
        <div className="card-body"><div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
          {configs.map((c,i) => (
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'var(--space-3) 0',borderBottom:i < configs.length-1?'1px solid var(--clr-border)':'none'}}>
              <div><div style={{fontWeight:600,fontSize:'var(--text-sm)'}}>{c.label}</div><div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)'}}>{c.desc}</div></div>
              {c.badge ? <span className={`badge ${c.cls}`}>{c.badge}</span> : <strong>{c.value}</strong>}
            </div>
          ))}
        </div></div>
      </div>
    </>
  );
}
