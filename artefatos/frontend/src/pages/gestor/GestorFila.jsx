export default function GestorFila() {
  const rows = [
    {p:1,n:'Maria da Silva',pr:'Consulta Cardiologia',pri:'Alta',st:'Aguardando',m:'Dr. Carlos Andrade',dt:'02/05',d:3,act:'Aprovar'},
    {p:2,n:'Carlos Lima',pr:'Consulta Neurologia',pri:'Alta',st:'Aprovado',m:'Dr. Paulo Reis',dt:'25/04',d:10,act:'Agendar'},
    {p:3,n:'Fernanda Oliveira',pr:'Tomografia',pri:'Alta',st:'Em Andamento',m:'Dr. Paulo Reis',dt:'12/04',d:23,act:'Ver'},
    {p:4,n:'João Pereira',pr:'Cirurgia Ortopédica',pri:'Média',st:'Aprovado',m:'Dra. Ana Costa',dt:'29/04',d:6,act:'Agendar'},
    {p:5,n:'Rodrigo Alves',pr:'Consulta Pneumologia',pri:'Média',st:'Aprovado',m:'Dr. Carlos Andrade',dt:'15/04',d:20,act:'Agendar'},
    {p:6,n:'Ana Souza',pr:'Ressonância Magnética',pri:'Baixa',st:'Aguardando',m:'Dr. Carlos Andrade',dt:'28/04',d:7,act:'Aprovar'},
    {p:7,n:'Lucas Santos',pr:'Consulta Dermatologia',pri:'Baixa',st:'Aguardando',m:'Dra. Ana Costa',dt:'10/04',d:25,act:'Aprovar'},
  ];
  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'var(--space-4)',marginBottom:'var(--space-6)'}}>
        <div><h1 className="page-title" style={{marginBottom:4}}>Fila de Procedimentos</h1><p className="page-subtitle" style={{margin:0}}>Gerenciamento e priorização da fila de espera — 156 pacientes.</p></div>
        <div style={{display:'flex',gap:'var(--space-3)'}}><button className="btn btn-secondary"><i className="fa-solid fa-file-export"></i> Exportar</button><button className="btn btn-primary"><i className="fa-solid fa-plus"></i> Cadastrar Solicitação</button></div>
      </div>
      <div className="table-container animate-fade-in-up">
        <div className="table-header"><div className="table-search"><i className="fa-solid fa-search"></i><input type="text" placeholder="Buscar paciente..." /></div><div className="filter-bar"><select className="filter-select"><option value="">Prioridade</option><option>Alta</option><option>Média</option><option>Baixa</option></select><select className="filter-select"><option value="">Status</option><option>Aguardando</option><option>Aprovado</option><option>Em Andamento</option></select><select className="filter-select"><option value="">Especialidade</option><option>Cardiologia</option><option>Ortopedia</option><option>Neurologia</option><option>Pneumologia</option></select></div></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>Pos.</th><th>Paciente</th><th>Procedimento</th><th>Prioridade</th><th>Status</th><th>Médico</th><th>Data Solic.</th><th>Dias</th><th>Ações</th></tr></thead>
          <tbody>{rows.map((r,i) => <tr key={i}><td><strong>{r.p}</strong></td><td><strong>{r.n}</strong></td><td>{r.pr}</td><td><span className={`badge ${r.pri==='Alta'?'badge-danger':r.pri==='Média'?'badge-info':'badge-secondary'}`}>{r.pri}</span></td><td><span className={`badge badge-dot ${r.st==='Aguardando'?'badge-warning':r.st==='Aprovado'?'badge-success':'badge-info'}`}>{r.st}</span></td><td>{r.m}</td><td>{r.dt}</td><td>{r.d}</td><td><button className={`btn btn-sm ${r.act==='Aprovar'?'btn-primary':'btn-ghost'}`}>{r.act}</button></td></tr>)}</tbody>
        </table>
        </div>
      </div>
    </>
  );
}
