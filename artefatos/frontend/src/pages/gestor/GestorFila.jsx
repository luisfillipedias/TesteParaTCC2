import { useState, useEffect } from 'react';
import { getSolicitacoes } from '../../services/api';

export default function GestorFila() {
  const [fila, setFila] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFila() {
      try {
        const data = await getSolicitacoes();
        setFila(data || []);
      } catch (error) {
        console.error("Erro ao carregar fila", error);
      } finally {
        setLoading(false);
      }
    }
    loadFila();
  }, []);

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'var(--space-4)',marginBottom:'var(--space-6)'}}>
        <div><h1 className="page-title" style={{marginBottom:4}}>Fila de Procedimentos</h1><p className="page-subtitle" style={{margin:0}}>Gerenciamento e priorização da fila de espera.</p></div>
        <div style={{display:'flex',gap:'var(--space-3)'}}><button className="btn btn-secondary"><i className="fa-solid fa-file-export"></i> Exportar</button><button className="btn btn-primary"><i className="fa-solid fa-plus"></i> Cadastrar Solicitação</button></div>
      </div>
      <div className="table-container animate-fade-in-up">
        <div className="table-header"><div className="table-search"><i className="fa-solid fa-search"></i><input type="text" placeholder="Buscar paciente..." /></div><div className="filter-bar"><select className="filter-select"><option value="">Prioridade</option><option>Alta</option><option>Média</option><option>Baixa</option></select><select className="filter-select"><option value="">Status</option><option>Aguardando</option><option>Aprovado</option><option>Em Andamento</option></select><select className="filter-select"><option value="">Especialidade</option><option>Cardiologia</option><option>Ortopedia</option><option>Neurologia</option><option>Pneumologia</option></select></div></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>Pos.</th><th>Paciente</th><th>Procedimento</th><th>Prioridade</th><th>Status</th><th>Médico</th><th>Data Solic.</th><th>Dias</th><th>Ações</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{textAlign:'center', padding:'var(--space-4)'}}>Carregando fila...</td></tr>
            ) : fila.length > 0 ? (
              fila.map((r,i) => (
                <tr key={i}>
                  <td><strong>#{i + 1}</strong></td>
                  <td><strong>{r.paciente}</strong></td>
                  <td>{r.procedimento}</td>
                  <td><span className={`badge ${r.prioridade==='Alta'?'badge-danger':r.prioridade==='Média'?'badge-info':'badge-secondary'}`}>{r.prioridade}</span></td>
                  <td><span className={`badge badge-dot ${r.status==='Aguardando'?'badge-warning':r.status==='Aprovado'?'badge-success':'badge-info'}`}>{r.status}</span></td>
                  <td>{r.medico}</td>
                  <td>{r.data}</td>
                  <td>{r.diasEspera}</td>
                  <td><button className={`btn btn-sm ${r.status==='Aguardando'?'btn-primary':'btn-ghost'}`}>Aprovar</button></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" style={{textAlign:'center', padding:'var(--space-4)', color:'var(--clr-text-muted)'}}>Nenhum paciente na fila.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}
