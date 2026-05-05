import { Link } from 'react-router-dom';
import { MOCK } from '../../data/mockData';

const priCls = { Alta:'badge-danger', Média:'badge-info', Baixa:'badge-secondary' };
const stCls = { Aguardando:'badge-warning badge-dot', Aprovado:'badge-success badge-dot', 'Em Andamento':'badge-info badge-dot', Concluído:'badge-primary badge-dot', Cancelado:'badge-danger badge-dot' };

export default function MedicoSolicitacoes() {
  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'var(--space-4)',marginBottom:'var(--space-6)'}}>
        <div><h1 className="page-title" style={{marginBottom:4}}>Minhas Solicitações</h1><p className="page-subtitle" style={{marginBottom:0}}>Histórico de procedimentos e transportes solicitados por você.</p></div>
        <Link to="/medico/nova-solicitacao" className="btn btn-accent"><i className="fa-solid fa-plus"></i> Nova solicitação</Link>
      </div>
      <div className="table-container animate-fade-in-up">
        <div className="table-header">
          <div className="table-search"><i className="fa-solid fa-search"></i><input type="text" placeholder="Buscar paciente ou procedimento..." /></div>
          <div className="filter-bar">
            <select className="filter-select"><option value="">Todas prioridades</option><option>Alta</option><option>Média</option><option>Baixa</option></select>
            <select className="filter-select"><option value="">Todos os status</option><option>Aguardando</option><option>Aprovado</option><option>Em Andamento</option><option>Concluído</option><option>Cancelado</option></select>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>#</th><th>Paciente</th><th>Procedimento</th><th>Prioridade</th><th>Status</th><th>Data</th><th>Ações</th></tr></thead>
          <tbody>
            {MOCK.solicitacoes.map((s, i) => (
              <tr key={i}><td style={{color:'var(--clr-text-muted)'}}>{s.id}</td><td><strong>{s.paciente}</strong></td><td>{s.procedimento}</td><td><span className={`badge ${priCls[s.prioridade]}`}>{s.prioridade}</span></td><td><span className={`badge ${stCls[s.status]}`}>{s.status}</span></td><td>{s.data}</td><td><button className="btn btn-ghost btn-sm">Ver</button></td></tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}
