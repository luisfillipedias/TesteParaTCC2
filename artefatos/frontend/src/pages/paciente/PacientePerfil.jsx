export default function PacientePerfil() {
  return (
    <>
      <h1 className="page-title">Meu Perfil</h1>
      <p className="page-subtitle">Suas informações no RegulaSUS.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'var(--space-6)',alignItems:'start'}}>
        <div className="card animate-fade-in-up">
          <div className="card-body" style={{textAlign:'center',padding:'var(--space-8)'}}>
            <div style={{width:96,height:96,borderRadius:'var(--radius-full)',background:'var(--grad-primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-4)',fontWeight:700,fontSize:'var(--text-3xl)'}}>MS</div>
            <h2 style={{fontSize:'var(--text-xl)',marginBottom:'var(--space-1)'}}>Maria da Silva</h2>
            <span className="badge badge-primary" style={{marginBottom:'var(--space-4)'}}>Paciente</span>
            <div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',marginTop:'var(--space-3)'}}><p>CNS: 898 0012 3456 7890</p><p>Membro desde Fev 2026</p></div>
          </div>
        </div>
        <div className="card animate-fade-in-up delay-1">
          <div className="card-header"><h3><i className="fa-solid fa-user-pen" style={{color:'var(--clr-primary)',marginRight:8}}></i> Dados Pessoais</h3></div>
          <div className="card-body">
            <div className="form-row"><div className="form-group"><label className="form-label">Nome Completo</label><input type="text" className="form-control" defaultValue="Maria da Silva" readOnly /></div><div className="form-group"><label className="form-label">CPF</label><input type="text" className="form-control" defaultValue="***.***.789-01" readOnly /></div></div>
            <div className="form-row"><div className="form-group"><label className="form-label">E-mail</label><input type="email" className="form-control" defaultValue="maria@email.com" readOnly /></div><div className="form-group"><label className="form-label">Telefone</label><input type="text" className="form-control" defaultValue="(31) 98888-7777" readOnly /></div></div>
            <div className="form-row"><div className="form-group"><label className="form-label">Cartão SUS</label><input type="text" className="form-control" defaultValue="898 0012 3456 7890" readOnly /></div><div className="form-group"><label className="form-label">Data de Nascimento</label><input type="text" className="form-control" defaultValue="15/04/1968" readOnly /></div></div>
            <div style={{display:'flex',gap:'var(--space-3)',justifyContent:'flex-end',marginTop:'var(--space-4)'}}><button className="btn btn-secondary"><i className="fa-solid fa-key"></i> Alterar Senha</button><button className="btn btn-primary"><i className="fa-solid fa-pen"></i> Editar Perfil</button></div>
          </div>
        </div>
      </div>
    </>
  );
}
