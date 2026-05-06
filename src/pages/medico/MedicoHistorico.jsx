import { useState, useEffect } from 'react';
import { getHistorico } from '../../services/api';

export default function MedicoHistorico() {
  const [historico, setHistorico] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarPaciente = async (e) => {
    e.preventDefault();
    if (!busca) return;
    setLoading(true);
    try {
      // Simulate fetch from API
      const data = await getHistorico();
      setHistorico(data || []);
      // Placeholder patient data since we don't have real endpoint yet
      if (data.length > 0) {
        setPaciente({ nome: busca, cpf: '***.***.***-**', idade: 'N/A', cns: 'N/A', tipoSanguineo: 'N/A', alergias: 'N/A' });
      } else {
        setPaciente(null);
      }
    } catch (error) {
      console.error("Erro ao buscar histórico", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="page-title">Histórico do Paciente</h1>
      <p className="page-subtitle">Consulte o prontuário e histórico de atendimentos do paciente.</p>
      
      <form onSubmit={buscarPaciente} className="card" style={{marginBottom:'var(--space-6)'}}>
        <div className="card-body" style={{display:'flex',gap:'var(--space-4)',alignItems:'end',flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:250}}>
            <label className="form-label">Buscar Paciente</label>
            <div className="table-search" style={{width:'100%'}}>
              <i className="fa-solid fa-search"></i>
              <input type="text" placeholder="Nome, CPF ou Cartão SUS..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-search"></i>} Consultar
          </button>
        </div>
      </form>

      {paciente ? (
        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'var(--space-6)',alignItems:'start'}}>
          <div className="card animate-fade-in-up">
            <div className="card-body" style={{textAlign:'center'}}>
              <div style={{width:72,height:72,borderRadius:'var(--radius-full)',background:'var(--grad-primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-3)',fontWeight:700,fontSize:'var(--text-xl)'}}>
                {paciente.nome.substring(0,2).toUpperCase()}
              </div>
              <h3 style={{fontSize:'var(--text-md)',marginBottom:2}}>{paciente.nome}</h3>
              <p style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',marginBottom:'var(--space-4)'}}>CPF: {paciente.cpf}</p>
              <div style={{textAlign:'left',fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Idade:</span><strong style={{color:'var(--clr-text)'}}>{paciente.idade}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>CNS:</span><strong style={{color:'var(--clr-text)'}}>{paciente.cns}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Tipo Sanguíneo:</span><strong style={{color:'var(--clr-text)'}}>{paciente.tipoSanguineo}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Alergias:</span><strong style={{color:'var(--clr-danger)'}}>{paciente.alergias}</strong></div>
              </div>
            </div>
          </div>
          <div className="card animate-fade-in-up delay-1">
            <div className="card-header"><h3><i className="fa-solid fa-clock-rotate-left" style={{color:'var(--clr-secondary)',marginRight:8}}></i> Histórico de Atendimentos</h3></div>
            <div className="card-body" style={{padding:0}}>
              <div style={{overflowX:'auto'}}>
              <table className="data-table">
                <thead><tr><th>Data</th><th>Procedimento</th><th>Médico</th><th>Unidade</th><th>Status</th></tr></thead>
                <tbody>
                  {historico.length > 0 ? historico.map((r,i) => (
                    <tr key={i}><td>{r.data}</td><td><strong>{r.procedimento}</strong></td><td>{r.medico}</td><td>{r.unidade}</td><td><span className={`badge ${r.statusClass}`}>{r.status}</span></td></tr>
                  )) : (
                    <tr><td colSpan="5" style={{textAlign:'center', color:'var(--clr-text-muted)'}}>Nenhum histórico encontrado.</td></tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{textAlign:'center', padding:'var(--space-8)', color:'var(--clr-text-muted)'}}>
          Busque por um paciente para visualizar o histórico de atendimentos.
        </div>
      )}
    </>
  );
}
