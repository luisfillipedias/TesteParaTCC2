import { useState, useEffect } from 'react';
import { getAuditoria } from '../../services/api';

export default function AdminAuditoria() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);

  async function loadLogs(searchTerm = '') {
    setLoading(true);
    try {
      const data = await getAuditoria(searchTerm);
      setLogs(data || []);
    } catch (error) {
      console.error("Erro ao carregar auditoria", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setBusca(value);
    if (searchTimer) clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => {
      loadLogs(value);
    }, 400));
  };

  return (
    <>
      <h1 className="page-title">Log de Auditoria</h1>
      <p className="page-subtitle">Registro de todas as ações realizadas no sistema.</p>
      <div className="table-container animate-fade-in-up">
        <div className="table-header">
          <div className="table-search">
            <i className="fa-solid fa-search"></i>
            <input type="text" placeholder="Buscar ação ou usuário..." value={busca} onChange={handleSearchChange} />
          </div>
          <div className="filter-bar">
            <button className="btn btn-secondary btn-sm" onClick={() => loadLogs(busca)}>
              <i className="fa-solid fa-arrows-rotate"></i> Atualizar
            </button>
          </div>
        </div>
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
