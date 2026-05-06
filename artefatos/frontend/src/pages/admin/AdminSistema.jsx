import { useState, useEffect } from 'react';
import { getSistemaStatus } from '../../services/api';

export default function AdminSistema() {
  const [statusInfo, setStatusInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatus() {
      try {
        const data = await getSistemaStatus();
        setStatusInfo(data);
      } catch (error) {
        console.error("Erro ao carregar status do sistema", error);
      } finally {
        setLoading(false);
      }
    }
    loadStatus();
  }, []);

  return (
    <>
      <h1 className="page-title">Informações do Sistema</h1>
      <p className="page-subtitle">Status e configurações do RegulaSUS.</p>
      
      {loading ? (
        <div style={{padding: 'var(--space-8)', textAlign: 'center', color: 'var(--clr-text-muted)'}}>
          Verificando status do sistema...
        </div>
      ) : statusInfo ? (
        <>
          <div className="dashboard-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginBottom:'var(--space-6)'}}>
            <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-circle-check"></i></div><div className="stat-label">Status</div><div className="stat-value" style={{color:'var(--clr-success)',fontSize:'var(--text-lg)'}}>{statusInfo.status || 'Online'}</div></div>
            <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-code-branch"></i></div><div className="stat-label">Versão</div><div className="stat-value" style={{fontSize:'var(--text-lg)'}}>{statusInfo.versao || 'v1.0.0'}</div></div>
            <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-clock"></i></div><div className="stat-label">Uptime</div><div className="stat-value" style={{fontSize:'var(--text-lg)'}}>{statusInfo.uptime || 'N/A'}</div></div>
          </div>
          <div className="card animate-fade-in-up delay-2">
            <div className="card-header"><h3><i className="fa-solid fa-server" style={{color:'var(--clr-primary)',marginRight:8}}></i> Configurações</h3></div>
            <div className="card-body">
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
                {statusInfo.configs && statusInfo.configs.length > 0 ? (
                  statusInfo.configs.map((c,i) => (
                    <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'var(--space-3) 0',borderBottom:i < statusInfo.configs.length-1?'1px solid var(--clr-border)':'none'}}>
                      <div><div style={{fontWeight:600,fontSize:'var(--text-sm)'}}>{c.label}</div><div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)'}}>{c.desc}</div></div>
                      {c.badge ? <span className={`badge ${c.cls}`}>{c.badge}</span> : <strong>{c.value}</strong>}
                    </div>
                  ))
                ) : (
                  <div style={{textAlign: 'center', color: 'var(--clr-text-muted)', padding: 'var(--space-4)'}}>Nenhuma configuração recebida do servidor.</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card" style={{padding: 'var(--space-8)', textAlign: 'center', color: 'var(--clr-danger)'}}>
          <i className="fa-solid fa-triangle-exclamation" style={{fontSize: '2rem', marginBottom: 'var(--space-3)'}}></i>
          <p>Servidor não pôde ser contatado.</p>
        </div>
      )}
    </>
  );
}
