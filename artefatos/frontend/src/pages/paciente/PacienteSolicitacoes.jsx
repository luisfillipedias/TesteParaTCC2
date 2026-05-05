import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PacienteSolicitacoes() {
  const [modalOpen, setModalOpen] = useState(false);
  const solics = [
    { icon: 'fa-heart-pulse', bg: 'var(--clr-primary-light)', color: 'var(--clr-primary)', proc: 'Consulta Cardiologia', info: 'Solicitação #1204 · Dr. Carlos Andrade · 02/05/2026', prioridade: 'Alta', priCls: 'badge-danger', status: 'Aguardando', stCls: 'badge-warning badge-dot', posicao: '#5', canCancel: true },
    { icon: 'fa-bone', bg: 'var(--clr-secondary-light)', color: 'var(--clr-secondary)', proc: 'Cirurgia Ortopédica', info: 'Solicitação #1198 · Dra. Ana Costa · 29/04/2026', prioridade: 'Média', priCls: 'badge-info', status: 'Aprovado', stCls: 'badge-success badge-dot' },
    { icon: 'fa-x-ray', bg: 'var(--clr-accent-light)', color: 'var(--clr-accent)', proc: 'Ressonância Magnética', info: 'Solicitação #1193 · Dr. Carlos Andrade · 28/04/2026', prioridade: 'Baixa', priCls: 'badge-secondary', status: 'Aguardando', stCls: 'badge-warning badge-dot' },
  ];

  return (
    <>
      <h1 className="page-title">Minhas Solicitações</h1>
      <p className="page-subtitle">Acompanhe o andamento dos seus procedimentos e transportes.</p>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
        {solics.map((s, i) => (
          <div className={`card animate-fade-in-up${i > 0 ? ` delay-${i}` : ''}`} key={i}>
            <div className="card-body" style={{display:'flex',alignItems:'center',gap:'var(--space-5)',flexWrap:'wrap'}}>
              <div style={{width:48,height:48,borderRadius:'var(--radius-lg)',background:s.bg,color:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'var(--text-xl)',flexShrink:0}}><i className={`fa-solid ${s.icon}`}></i></div>
              <div style={{flex:1,minWidth:200}}>
                <div style={{fontWeight:700,fontSize:'var(--text-md)',marginBottom:2}}>{s.proc}</div>
                <div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)'}}>{s.info}</div>
              </div>
              <div style={{display:'flex',gap:'var(--space-3)',alignItems:'center',flexWrap:'wrap'}}>
                <span className={`badge ${s.priCls}`}>{s.prioridade}</span>
                <span className={`badge ${s.stCls}`}>{s.status}</span>
                {s.posicao && <span className="badge badge-primary"><i className="fa-solid fa-users-line" style={{marginRight:4}}></i> Posição {s.posicao}</span>}
              </div>
              <div style={{display:'flex',gap:'var(--space-2)'}}>
                <Link to="/paciente/detalhes" className="btn btn-secondary btn-sm"><i className="fa-solid fa-eye"></i> Ver</Link>
                {s.canCancel && <button className="btn btn-ghost btn-sm" style={{color:'var(--clr-danger)'}} onClick={() => setModalOpen(true)}><i className="fa-solid fa-xmark"></i> Cancelar</button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Modal */}
      <div className={`modal-overlay${modalOpen ? ' active' : ''}`}>
        <div className="modal">
          <div className="modal-header"><h3>Solicitar Cancelamento</h3><button className="btn btn-ghost btn-icon" onClick={() => setModalOpen(false)}><i className="fa-solid fa-xmark"></i></button></div>
          <div className="modal-body">
            <p style={{fontSize:'var(--text-sm)',color:'var(--clr-text-secondary)',marginBottom:'var(--space-4)'}}>Tem certeza que deseja cancelar a solicitação #1204?</p>
            <div className="form-group"><label className="form-label">Motivo do cancelamento <span className="required">*</span></label><textarea className="form-control" placeholder="Descreva o motivo..."></textarea></div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Voltar</button>
            <button className="btn btn-danger" onClick={() => { alert('Cancelamento solicitado!'); setModalOpen(false); }}><i className="fa-solid fa-xmark"></i> Confirmar Cancelamento</button>
          </div>
        </div>
      </div>
    </>
  );
}
