import { useState, useEffect } from 'react';
import { getLocais } from '../../services/api';

const gradients = ['#1351B4','#0C326F','#155BCB','#2670E8','#071D41','#268744'];
const icons = ['fa-hospital','fa-house-medical','fa-truck-medical','fa-stethoscope','fa-hospital','fa-house-chimney-medical'];
const badgeCls = { Hospital:'badge-primary', UBS:'badge-info', UPA:'badge-danger', Clínica:'badge-secondary', PSF:'badge-success' };

export default function PacienteLocais() {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocais() {
      try {
        const data = await getLocais();
        setLocais(data || []);
      } catch (error) {
        console.error("Erro ao buscar locais", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLocais();
  }, []);

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

      {loading ? (
        <div style={{textAlign:'center', padding: 'var(--space-8)'}}>Carregando locais...</div>
      ) : locais.length > 0 ? (
        <div className="location-grid">
          {locais.map((l, i) => (
            <div className={`location-card animate-fade-in-up${i > 0 ? ` delay-${i}` : ''}`} key={i}>
              <div className="loc-img" style={{background:gradients[i % gradients.length]}}><i className={`fa-solid ${icons[i % icons.length]}`}></i></div>
              <div className="loc-info">
                <h3>{l.nome && l.nome.length > 25 ? l.nome.substring(0,25) + '...' : l.nome}</h3>
                <p><i className="fa-solid fa-location-dot"></i> {l.endereco}</p>
                <p><i className="fa-solid fa-phone"></i> {l.tel}</p>
                <div className="loc-tags">{l.especialidades && l.especialidades.map((e, j) => <span className={`badge ${badgeCls[l.tipo] || 'badge-primary'}`} key={j}>{e}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card"><div className="card-body" style={{textAlign:'center', color:'var(--clr-text-muted)'}}>Nenhum local encontrado.</div></div>
      )}
    </>
  );
}
