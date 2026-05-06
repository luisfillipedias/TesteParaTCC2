import { useState, useEffect } from 'react';
import { getTransportes } from '../../services/api';

const stCls = { Confirmado:'badge-success badge-dot', Pendente:'badge-warning badge-dot', 'Em Rota':'badge-info badge-dot', Concluído:'badge-primary badge-dot', Cancelado:'badge-danger badge-dot' };
const tipoCls = { Ambulância:'badge-info', Van:'badge-secondary' };
const actMap = { Confirmado:'Ver', Pendente:'Confirmar', 'Em Rota':'Rastrear', Concluído:'Ver', Cancelado:'Ver' };

export default function GestorTransporte() {
  const [modal, setModal] = useState(false);
  const [transportes, setTransportes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransportes() {
      try {
        const data = await getTransportes();
        setTransportes(data || []);
      } catch (error) {
        console.error("Erro ao buscar transportes", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransportes();
  }, []);

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'var(--space-4)',marginBottom:'var(--space-6)'}}>
        <div><h1 className="page-title" style={{marginBottom:4}}>Transporte Ambulatorial</h1><p className="page-subtitle" style={{margin:0}}>Gerenciamento de ambulâncias e transporte de pacientes.</p></div>
        <button className="btn btn-primary" onClick={() => setModal(true)}><i className="fa-solid fa-plus"></i> Registrar Transporte</button>
      </div>
      <div className="dashboard-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginBottom:'var(--space-6)'}}>
        <div className="stat-card animate-fade-in-up"><div className="stat-icon blue"><i className="fa-solid fa-ambulance"></i></div><div className="stat-label">Transportes Hoje</div><div className="stat-value">{transportes.length}</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon green"><i className="fa-solid fa-route"></i></div><div className="stat-label">Em Rota</div><div className="stat-value">{transportes.filter(t => t.status === 'Em Rota').length}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-clock"></i></div><div className="stat-label">Pendentes</div><div className="stat-value">{transportes.filter(t => t.status === 'Pendente').length}</div></div>
      </div>
      <div className="table-container animate-fade-in-up delay-2">
        <div className="table-header"><div className="table-search"><i className="fa-solid fa-search"></i><input type="text" placeholder="Buscar transporte..." /></div><div className="filter-bar"><select className="filter-select"><option value="">Status</option><option>Confirmado</option><option>Pendente</option><option>Em Rota</option><option>Concluído</option></select></div></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>ID</th><th>Paciente</th><th>Origem</th><th>Destino</th><th>Data</th><th>Horário</th><th>Status</th><th>Tipo</th><th>Ações</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{textAlign:'center', padding:'var(--space-4)'}}>Carregando transportes...</td></tr>
            ) : transportes.length > 0 ? (
              transportes.map((t,i) => (
                <tr key={i}>
                  <td style={{color:'var(--clr-text-muted)'}}>{t.id}</td>
                  <td><strong>{t.paciente}</strong></td>
                  <td>{t.origem}</td>
                  <td>{t.destino}</td>
                  <td>{t.data}</td>
                  <td>{t.horario}</td>
                  <td><span className={`badge ${stCls[t.status] || 'badge-secondary'}`}>{t.status}</span></td>
                  <td><span className={`badge ${tipoCls[t.tipo] || 'badge-secondary'}`}>{t.tipo}</span></td>
                  <td><button className={`btn btn-sm ${t.status==='Pendente'?'btn-primary':'btn-ghost'}`}>{actMap[t.status] || 'Ver'}</button></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" style={{textAlign:'center', padding:'var(--space-4)', color:'var(--clr-text-muted)'}}>Nenhum transporte encontrado.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      <div className={`modal-overlay${modal?' active':''}`}><div className="modal">
        <div className="modal-header"><h3>Registrar Transporte</h3><button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><i className="fa-solid fa-xmark"></i></button></div>
        <div className="modal-body">
          <div className="form-group"><label className="form-label">Paciente <span className="required">*</span></label><input type="text" className="form-control" placeholder="Nome ou CPF" /></div>
          <div className="form-row"><div className="form-group"><label className="form-label">Origem <span className="required">*</span></label><select className="form-control form-select"><option>UBS Centro</option><option>UPA Norte</option><option>PSF Vila Nova</option><option>UBS Leste</option></select></div><div className="form-group"><label className="form-label">Destino <span className="required">*</span></label><select className="form-control form-select"><option>Hospital Regional</option><option>Hospital Estadual</option><option>Clínica São Lucas</option></select></div></div>
          <div className="form-row"><div className="form-group"><label className="form-label">Data <span className="required">*</span></label><input type="date" className="form-control" /></div><div className="form-group"><label className="form-label">Horário <span className="required">*</span></label><input type="time" className="form-control" /></div></div>
          <div className="form-group"><label className="form-label">Tipo de Veículo</label><select className="form-control form-select"><option>Ambulância</option><option>Van Adaptada</option></select></div>
          <div className="form-group"><label className="form-label">Observações</label><textarea className="form-control" placeholder="Informações adicionais..."></textarea></div>
        </div>
        <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={() => {alert('Transporte registrado!');setModal(false);}}><i className="fa-solid fa-check"></i> Registrar</button></div>
      </div></div>
    </>
  );
}
