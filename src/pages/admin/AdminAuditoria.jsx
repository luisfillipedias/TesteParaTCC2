import { useState, useEffect } from 'react';
import { getAuditoria } from '../../services/api';

export default function AdminAuditoria() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroPerfil, setFiltroPerfil] = useState('');
  const [filtroAcao, setFiltroAcao] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);

  const loadLogs = async (searchTerm = busca, currentPerfil = filtroPerfil, currentAcao = filtroAcao) => {
    setLoading(true);
    try {
      const data = await getAuditoria({ busca: searchTerm, perfil: currentPerfil, acao: currentAcao });
      setLogs(data || []);
    } catch (error) {
      console.error("Erro ao carregar auditoria", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setBusca(value);
    if (searchTimer) clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => {
      loadLogs(value, filtroPerfil, filtroAcao);
    }, 400));
  };

  const handlePerfilChange = (e) => {
    const value = e.target.value;
    setFiltroPerfil(value);
    loadLogs(busca, value, filtroAcao);
  };

  const handleAcaoChange = (e) => {
    const value = e.target.value;
    setFiltroAcao(value);
    loadLogs(busca, filtroPerfil, value);
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
          <div className="filter-bar" style={{display:'flex',gap:'var(--space-2)',flexWrap:'wrap',alignItems:'center'}}>
            <select className="filter-select" value={filtroPerfil} onChange={handlePerfilChange}>
              <option value="">Todos os perfis</option>
              <option>Administrador</option>
              <option>Gestor Municipal</option>
              <option>Gestor Estadual</option>
              <option>Médico</option>
              <option>Paciente</option>
            </select>
            <select className="filter-select" value={filtroAcao} onChange={handleAcaoChange}>
              <option value="">Todas as ações</option>
              <option>Login</option>
              <option>Criar Usuário</option>
              <option>Editar Usuário</option>
              <option>Excluir Usuário</option>
              <option>Alterar Senha</option>
              <option>Alterar Permissão</option>
              <option>Editar Perfil</option>
            </select>
            <button className="btn btn-secondary btn-sm" onClick={() => loadLogs(busca, filtroPerfil, filtroAcao)}>
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
