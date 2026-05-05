import { MOCK } from '../../data/mockData';
const gradients = ['linear-gradient(135deg,#0D6B3F,#10B981)','linear-gradient(135deg,#1A73B5,#3B82F6)','linear-gradient(135deg,#DC3545,#F472B6)','linear-gradient(135deg,#8B5CF6,#A78BFA)','linear-gradient(135deg,#094D2D,#0D6B3F)','linear-gradient(135deg,#14B8A6,#2DD4BF)'];
const icons = ['fa-hospital','fa-house-medical','fa-truck-medical','fa-stethoscope','fa-hospital','fa-house-chimney-medical'];
const badgeCls = { Hospital:'badge-primary', UBS:'badge-info', UPA:'badge-danger', Clínica:'badge-secondary', PSF:'badge-success' };

export default function PacienteLocais() {
  return (
    <>
      <h1 className="page-title">Locais de Atendimento</h1>
      <p className="page-subtitle">Encontre unidades de saúde por especialidade ou localização.</p>
      <div className="card" style={{marginBottom:'var(--space-6)'}}>
        <div className="card-body" style={{display:'flex',gap:'var(--space-4)',flexWrap:'wrap',alignItems:'end'}}>
          <div style={{flex:1,minWidth:200}}><label className="form-label">Buscar</label><div className="table-search" style={{width:'100%'}}><i className="fa-solid fa-search"></i><input type="text" placeholder="Nome da unidade ou especialidade..." /></div></div>
          <div><label className="form-label">Tipo</label><select className="form-control form-select" style={{minWidth:150}}><option value="">Todos</option><option>Hospital</option><option>UBS</option><option>UPA</option><option>Clínica</option><option>PSF</option></select></div>
          <button className="btn btn-primary"><i className="fa-solid fa-search"></i> Buscar</button>
        </div>
      </div>
      <div className="location-grid">
        {MOCK.locais.map((l, i) => (
          <div className={`location-card animate-fade-in-up${i > 0 ? ` delay-${i}` : ''}`} key={i}>
            <div className="loc-img" style={{background:gradients[i]}}><i className={`fa-solid ${icons[i]}`}></i></div>
            <div className="loc-info">
              <h3>{l.nome.length > 25 ? l.nome.substring(0,25) + '...' : l.nome}</h3>
              <p><i className="fa-solid fa-location-dot"></i> {l.endereco}</p>
              <p><i className="fa-solid fa-phone"></i> {l.tel}</p>
              <div className="loc-tags">{l.especialidades.map((e, j) => <span className={`badge ${badgeCls[l.tipo] || 'badge-primary'}`} key={j}>{e}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
