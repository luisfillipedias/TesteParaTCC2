export default function MedicoPerfil() {
  return (
    <>
      <h1 className="page-title">Meu Perfil</h1>
      <p className="page-subtitle">Informações da sua conta no RegulaSUS.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'var(--space-6)',alignItems:'start'}}>
        <div className="card animate-fade-in-up"><div className="card-body" style={{textAlign:'center',padding:'var(--space-8)'}}>
          <div style={{width:96,height:96,borderRadius:'var(--radius-full)',background:'var(--grad-primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-4)',fontWeight:700,fontSize:'var(--text-3xl)'}}>CA</div>
          <h2 style={{fontSize:'var(--text-xl)',marginBottom:'var(--space-1)'}}>Dr. Carlos Andrade</h2>
          <span className="badge badge-info" style={{marginBottom:'var(--space-4)'}}>Médico</span>
          <div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',marginTop:'var(--space-3)'}}><p>CRM-MG 12345</p><p>Membro desde Janeiro 2026</p></div>
        </div></div>
        <div className="card animate-fade-in-up delay-1"><div className="card-header"><h3><i className="fa-solid fa-user-pen" style={{color:'var(--clr-primary)',marginRight:8}}></i> Dados Pessoais</h3></div><div className="card-body">
          <div className="form-row"><div className="form-group"><label className="form-label">Nome Completo</label><input type="text" className="form-control" defaultValue="Dr. Carlos Eduardo Andrade" readOnly /></div><div className="form-group"><label className="form-label">CPF</label><input type="text" className="form-control" defaultValue="***.***.456-78" readOnly /></div></div>
          <div className="form-row"><div className="form-group"><label className="form-label">E-mail</label><input type="email" className="form-control" defaultValue="carlos@sus.gov.br" readOnly /></div><div className="form-group"><label className="form-label">Telefone</label><input type="text" className="form-control" defaultValue="(31) 99876-5432" readOnly /></div></div>
          <div className="form-row"><div className="form-group"><label className="form-label">CRM</label><input type="text" className="form-control" defaultValue="CRM-MG 12345" readOnly /></div><div className="form-group"><label className="form-label">Especialidade</label><input type="text" className="form-control" defaultValue="Clínica Médica" readOnly /></div></div>
          <div className="form-row"><div className="form-group"><label className="form-label">Unidade Principal</label><input type="text" className="form-control" defaultValue="Hospital Regional de BH" readOnly /></div><div className="form-group"><label className="form-label">Perfil</label><input type="text" className="form-control" defaultValue="Médico" readOnly /></div></div>
          <div style={{display:'flex',gap:'var(--space-3)',justifyContent:'flex-end',marginTop:'var(--space-4)'}}><button className="btn btn-secondary"><i className="fa-solid fa-key"></i> Alterar Senha</button><button className="btn btn-primary"><i className="fa-solid fa-pen"></i> Editar Perfil</button></div>
        </div></div>
      </div>
    </>
  );
}
