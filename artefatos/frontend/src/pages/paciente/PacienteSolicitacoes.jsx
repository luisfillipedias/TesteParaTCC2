import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSolicitacoes } from '../../services/api';

export default function PacienteSolicitacoes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [solics, setSolics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSolics() {
      try {
        const data = await getSolicitacoes();
        setSolics(data || []);
      } catch (error) {
        console.error("Erro ao buscar solicitações", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSolics();
  }, []);

  const priCls = { Alta:'badge-danger', Média:'badge-info', Baixa:'badge-secondary' };
  const stCls = { Aguardando:'badge-warning badge-dot', Aprovado:'badge-success badge-dot', 'Em Andamento':'badge-info badge-dot', Concluído:'badge-primary badge-dot', Cancelado:'badge-danger badge-dot' };
  const iconMap = { 'Consulta Cardiologia': 'fa-heart-pulse', 'Cirurgia Ortopédica': 'fa-bone', 'Ressonância Magnética': 'fa-x-ray' };

  return (
    <>
      <h1 className="page-title">Minhas Solicitações</h1>
      <p className="page-subtitle">Acompanhe o andamento dos seus procedimentos e transportes.</p>
      
      {loading ? (
        <div style={{textAlign:'center', padding: 'var(--space-8)'}}>Carregando solicitações...</div>
      ) : solics.length > 0 ? (
        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
          {solics.map((s, i) => (
            <div className={`card animate-fade-in-up${i > 0 ? ` delay-${i}` : ''}`} key={i}>
              <div className="card-body" style={{display:'flex',alignItems:'center',gap:'var(--space-5)',flexWrap:'wrap'}}>
                <div style={{width:48,height:48,borderRadius:'var(--radius-lg)',background:'var(--clr-primary-light)',color:'var(--clr-primary)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'var(--text-xl)',flexShrink:0}}>
                  <i className={`fa-solid ${iconMap[s.procedimento] || 'fa-clipboard-list'}`}></i>
                </div>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{fontWeight:700,fontSize:'var(--text-md)',marginBottom:2}}>{s.procedimento}</div>
                  <div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)'}}>Solicitação #{s.id} · {s.medico} · {s.data}</div>
                </div>
                <div style={{display:'flex',gap:'var(--space-3)',alignItems:'center',flexWrap:'wrap'}}>
                  <span className={`badge ${priCls[s.prioridade]}`}>{s.prioridade}</span>
                  <span className={`badge ${stCls[s.status]}`}>{s.status}</span>
                  {s.posicao && <span className="badge badge-primary"><i className="fa-solid fa-users-line" style={{marginRight:4}}></i> Posição {s.posicao}</span>}
                </div>
                <div style={{display:'flex',gap:'var(--space-2)'}}>
                  <Link to="/paciente/detalhes" className="btn btn-secondary btn-sm"><i className="fa-solid fa-eye"></i> Ver</Link>
                  {s.status === 'Aguardando' && <button className="btn btn-ghost btn-sm" style={{color:'var(--clr-danger)'}} onClick={() => setModalOpen(true)}><i className="fa-solid fa-xmark"></i> Cancelar</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{textAlign:'center', padding: 'var(--space-10)'}}>
          <div style={{fontSize:'3rem', color:'var(--clr-text-muted)', marginBottom:'var(--space-4)'}}><i className="fa-solid fa-folder-open"></i></div>
          <h3 style={{marginBottom:'var(--space-2)'}}>Nenhuma solicitação encontrada</h3>
          <p style={{color:'var(--clr-text-secondary)'}}>Você ainda não possui solicitações de procedimentos ou transportes.</p>
        </div>
      )}

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
