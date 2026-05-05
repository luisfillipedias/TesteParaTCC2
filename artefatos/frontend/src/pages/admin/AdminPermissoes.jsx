const perms = [
  { func:'Consultar status solicitação', pac:true, med:true, gm:true, ge:true, sec:true, adm:true },
  { func:'Solicitar procedimento', pac:false, med:true, gm:false, ge:false, sec:false, adm:true },
  { func:'Solicitar transporte', pac:false, med:true, gm:true, ge:false, sec:false, adm:true },
  { func:'Gerenciar fila', pac:false, med:false, gm:true, ge:true, sec:false, adm:true },
  { func:'Monitorar indicadores', pac:false, med:false, gm:true, ge:true, sec:false, adm:true },
  { func:'Cadastrar usuários', pac:false, med:false, gm:false, ge:false, sec:false, adm:true },
];
const Check = () => <i className="fa-solid fa-check" style={{color:'var(--clr-success)'}}></i>;
const Cross = () => <i className="fa-solid fa-xmark" style={{color:'var(--clr-danger)'}}></i>;

export default function AdminPermissoes() {
  return (
    <>
      <h1 className="page-title">Permissões por Perfil</h1>
      <p className="page-subtitle">Configuração de acesso e funcionalidades por tipo de usuário.</p>
      <div className="table-container animate-fade-in-up">
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>Funcionalidade</th><th>Paciente</th><th>Médico</th><th>Gestor Mun.</th><th>Gestor Est.</th><th>Secretária</th><th>Admin</th></tr></thead>
          <tbody>{perms.map((p,i) => <tr key={i}><td><strong>{p.func}</strong></td>{[p.pac,p.med,p.gm,p.ge,p.sec,p.adm].map((v,j) => <td key={j} style={{textAlign:'center'}}>{v ? <Check/> : <Cross/>}</td>)}</tr>)}</tbody>
        </table>
        </div>
      </div>
    </>
  );
}
