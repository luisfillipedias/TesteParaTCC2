import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PacienteDetalhes() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="detail-header animate-fade-in-up">
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'var(--space-3)',marginBottom:'var(--space-2)'}}><h1 className="page-title" style={{margin:0}}>Consulta Cardiologia</h1><span className="badge badge-warning badge-dot">Aguardando</span></div>
          <p className="page-subtitle" style={{margin:0}}>Solicitação #1204 · Criada em 02/05/2026</p>
        </div>
        <div style={{display:'flex',gap:'var(--space-3)'}}>
          <button className="btn btn-secondary"><i className="fa-solid fa-print"></i> Imprimir</button>
          <button className="btn btn-danger" onClick={() => setModalOpen(true)}><i className="fa-solid fa-xmark"></i> Cancelar</button>
        </div>
      </div>
      <div className="card animate-fade-in-up delay-1" style={{marginBottom:'var(--space-6)'}}>
        <div className="card-body">
          <h3 style={{fontSize:'var(--text-md)',fontWeight:600,marginBottom:'var(--space-4)'}}>Progresso da Solicitação</h3>
          <div className="status-progress">
            <div className="status-step completed"><div className="step-dot"><i className="fa-solid fa-check"></i></div><div className="step-label">Solicitado<br/><small style={{color:'var(--clr-text-muted)'}}>02/05</small></div></div>
            <div className="status-step completed"><div className="step-dot"><i className="fa-solid fa-check"></i></div><div className="step-label">Recebido<br/><small style={{color:'var(--clr-text-muted)'}}>02/05</small></div></div>
            <div className="status-step current"><div className="step-dot"><i className="fa-solid fa-hourglass-half"></i></div><div className="step-label">Em Análise<br/><small>Em andamento</small></div></div>
            <div className="status-step"><div className="step-dot">4</div><div className="step-label">Aprovado</div></div>
            <div className="status-step"><div className="step-dot">5</div><div className="step-label">Agendado</div></div>
          </div>
        </div>
      </div>
      <div className="dashboard-grid-equal">
        <div className="card animate-fade-in-up delay-2">
          <div className="card-header"><h3><i className="fa-solid fa-file-medical" style={{color:'var(--clr-primary)',marginRight:8}}></i> Informações</h3></div>
          <div className="card-body">
            <div className="detail-info-grid">
              <div className="detail-info-item"><label>Procedimento</label><span>Consulta Cardiologia</span></div>
              <div className="detail-info-item"><label>Prioridade</label><span className="badge badge-danger">Alta</span></div>
              <div className="detail-info-item"><label>Médico Solicitante</label><span>Dr. Carlos Andrade</span></div>
              <div className="detail-info-item"><label>CRM</label><span>CRM-MG 12345</span></div>
              <div className="detail-info-item"><label>Unidade de Destino</label><span>Hospital Regional de BH</span></div>
              <div className="detail-info-item"><label>CID-10</label><span>I25.1</span></div>
              <div className="detail-info-item"><label>Data Preferencial</label><span>10/05/2026</span></div>
              <div className="detail-info-item"><label>Posição na Fila</label><span style={{color:'var(--clr-primary)',fontWeight:700}}>#5</span></div>
            </div>
            <div style={{marginTop:'var(--space-5)'}}>
              <label style={{fontSize:'var(--text-xs)',color:'var(--clr-text-muted)',textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:600,display:'block',marginBottom:'var(--space-2)'}}>Justificativa Clínica</label>
              <div style={{background:'var(--clr-bg)',borderRadius:'var(--radius-md)',padding:'var(--space-4)',fontSize:'var(--text-sm)',lineHeight:'var(--leading-relaxed)',color:'var(--clr-text-secondary)'}}>
                Paciente com quadro de dor torácica recorrente, ECG alterado. Necessita avaliação cardiológica especializada para definição de conduta terapêutica.
              </div>
            </div>
          </div>
        </div>
        <div className="card animate-fade-in-up delay-3">
          <div className="card-header"><h3><i className="fa-solid fa-clock-rotate-left" style={{color:'var(--clr-secondary)',marginRight:8}}></i> Histórico</h3></div>
          <div className="card-body">
            {[
              { icon: 'fa-magnifying-glass', bg: 'var(--clr-info-light)', color: 'var(--clr-info)', title: 'Em análise pela regulação', time: '03/05/2026 — 14:30', desc: 'Solicitação encaminhada para análise do regulador estadual.' },
              { icon: 'fa-inbox', bg: 'var(--clr-success-light)', color: 'var(--clr-success)', title: 'Solicitação recebida', time: '02/05/2026 — 16:00', desc: 'Documentos verificados e solicitação registrada no sistema.' },
              { icon: 'fa-paper-plane', bg: 'var(--clr-primary-light)', color: 'var(--clr-primary)', title: 'Solicitação criada', time: '02/05/2026 — 10:15', desc: 'Dr. Carlos Andrade criou a solicitação de Consulta Cardiologia.' },
            ].map((t, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" style={{background:t.bg,color:t.color}}><i className={`fa-solid ${t.icon}`}></i></div>
                <div><div style={{fontWeight:600,fontSize:'var(--text-sm)'}}>{t.title}</div><div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-muted)'}}>{t.time}</div><div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',marginTop:4}}>{t.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card animate-fade-in-up delay-4" style={{marginTop:'var(--space-5)'}}>
        <div className="card-header"><h3><i className="fa-solid fa-ambulance" style={{color:'var(--clr-accent)',marginRight:8}}></i> Transporte Ambulatorial</h3><span className="badge badge-success badge-dot">Confirmado</span></div>
        <div className="card-body">
          <div className="detail-info-grid">
            <div className="detail-info-item"><label>ID</label><span>T-0451</span></div>
            <div className="detail-info-item"><label>Tipo</label><span>Ambulância</span></div>
            <div className="detail-info-item"><label>Origem</label><span>UBS Centro</span></div>
            <div className="detail-info-item"><label>Destino</label><span>Hospital Regional</span></div>
            <div className="detail-info-item"><label>Data</label><span>03/05/2026</span></div>
            <div className="detail-info-item"><label>Horário</label><span>08:00</span></div>
          </div>
        </div>
      </div>
      <div className={`modal-overlay${modalOpen ? ' active' : ''}`}>
        <div className="modal">
          <div className="modal-header"><h3>Solicitar Cancelamento</h3><button className="btn btn-ghost btn-icon" onClick={() => setModalOpen(false)}><i className="fa-solid fa-xmark"></i></button></div>
          <div className="modal-body">
            <p style={{fontSize:'var(--text-sm)',color:'var(--clr-text-secondary)',marginBottom:'var(--space-4)'}}>Ao cancelar, sua posição na fila será perdida.</p>
            <div className="form-group"><label className="form-label">Motivo <span className="required">*</span></label><textarea className="form-control" placeholder="Descreva..."></textarea></div>
          </div>
          <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Voltar</button><button className="btn btn-danger" onClick={() => { alert('Cancelamento solicitado!'); setModalOpen(false); }}><i className="fa-solid fa-xmark"></i> Confirmar</button></div>
        </div>
      </div>
    </>
  );
}
