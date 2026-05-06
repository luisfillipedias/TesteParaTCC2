import { useState, useEffect } from 'react';
import { getAuditoria } from '../../services/api';

export default function AdminAuditoria() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await getAuditoria();
        setLogs(data || []);
      } catch (error) {
        console.error("Erro ao carregar auditoria", error);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  return (
    <>
      <h1 className="page-title">Log de Auditoria</h1>
      <p className="page-subtitle">Registro de todas as ações realizadas no sistema.</p>
      <div className="table-container animate-fade-in-up">
        <div className="table-header"><div className="table-search"><i className="fa-solid fa-search"></i><input type="text" placeholder="Buscar ação ou usuário..." /></div></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>Data/Hora</th><th>Usuário</th><th>Perfil</th><th>Ação</th><th>Detalhes</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign:'center', padding:'var(--space-4)'}}>Carregando registros de auditoria...</td></tr>
            ) : logs.length > 0 ? (
              logs.map((l,i) => (
                <tr key={i}>
                  <td style={{whiteSpace:'nowrap'}}>{l.dt}</td>
                  <td><strong>{l.user}</strong></td>
                  <td><span className={`badge ${l.cls || 'badge-secondary'}`}>{l.perfil}</span></td>
                  <td>{l.acao}</td>
                  <td style={{color:'var(--clr-text-secondary)'}}>{l.det}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={{textAlign:'center', color:'var(--clr-text-muted)', padding:'var(--space-4)'}}>Nenhum registro de auditoria encontrado.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}
