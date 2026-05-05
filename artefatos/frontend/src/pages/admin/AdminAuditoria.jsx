const logs = [
  { dt:'04/05 22:10', user:'Admin Sistema', perfil:'Admin', cls:'badge-secondary', acao:'Login', det:'Acesso ao painel administrativo' },
  { dt:'04/05 16:30', user:'Dr. Carlos Andrade', perfil:'Médico', cls:'badge-info', acao:'Criar solicitação', det:'Solicitação #1204 — Consulta Cardiologia' },
  { dt:'04/05 14:00', user:'Roberto Mendes', perfil:'Gestor', cls:'badge-warning', acao:'Aprovar solicitação', det:'Solicitação #1198 — Cirurgia Ortopédica aprovada' },
  { dt:'04/05 10:15', user:'Claudia Reis', perfil:'Secretária', cls:'badge-secondary', acao:'Verificar disponibilidade', det:'Consulta Neurologia — Hospital Regional' },
  { dt:'03/05 08:00', user:'Roberto Mendes', perfil:'Gestor', cls:'badge-warning', acao:'Registrar transporte', det:'T-0451 — Maria da Silva para Hospital Regional' },
  { dt:'02/05 20:00', user:'Admin Sistema', perfil:'Admin', cls:'badge-secondary', acao:'Cadastrar usuário', det:'Novo usuário: Claudia Reis (Secretária)' },
  { dt:'02/05 15:30', user:'Maria da Silva', perfil:'Paciente', cls:'badge-primary', acao:'Solicitar cancelamento', det:'Tentativa de cancelar solicitação #1175' },
];

export default function AdminAuditoria() {
  return (
    <>
      <h1 className="page-title">Log de Auditoria</h1>
      <p className="page-subtitle">Registro de todas as ações realizadas no sistema.</p>
      <div className="table-container animate-fade-in-up">
        <div className="table-header"><div className="table-search"><i className="fa-solid fa-search"></i><input type="text" placeholder="Buscar ação ou usuário..." /></div></div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>Data/Hora</th><th>Usuário</th><th>Perfil</th><th>Ação</th><th>Detalhes</th></tr></thead>
          <tbody>{logs.map((l,i) => <tr key={i}><td style={{whiteSpace:'nowrap'}}>{l.dt}</td><td><strong>{l.user}</strong></td><td><span className={`badge ${l.cls}`}>{l.perfil}</span></td><td>{l.acao}</td><td style={{color:'var(--clr-text-secondary)'}}>{l.det}</td></tr>)}</tbody>
        </table>
        </div>
      </div>
    </>
  );
}
