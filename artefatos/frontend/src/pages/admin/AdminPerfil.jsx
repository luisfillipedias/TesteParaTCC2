export default function AdminPerfil() {
  return (
    <>
      <h1 className="page-title">Meu Perfil</h1>
      <p className="page-subtitle">Informações de acesso administrador.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'var(--space-6)',alignItems:'start'}}>
        <div className="card animate-fade-in-up"><div className="card-body" style={{textAlign:'center',padding:'var(--space-8)'}}>
          <div style={{width:96,height:96,borderRadius:'var(--radius-full)',background:'var(--grad-primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-4)',fontWeight:700,fontSize:'var(--text-3xl)'}}>AS</div>
          <h2 style={{fontSize:'var(--text-xl)',marginBottom:'var(--space-1)'}}>Admin Sistema</h2>
          <span className="badge badge-secondary" style={{marginBottom:'var(--space-4)'}}>Root</span>
        </div></div>
        <div className="card animate-fade-in-up delay-1"><div className="card-header"><h3><i className="fa-solid fa-user-pen" style={{color:'var(--clr-primary)',marginRight:8}}></i> Credenciais</h3></div><div className="card-body">
          <div className="form-row"><div className="form-group"><label className="form-label">Usuário Mestre</label><input type="text" className="form-control" defaultValue="admin_root" readOnly /></div><div className="form-group"><label className="form-label">Permissões Globais</label><input type="text" className="form-control" defaultValue="Todos os módulos" readOnly /></div></div>
          <div style={{display:'flex',gap:'var(--space-3)',justifyContent:'flex-end',marginTop:'var(--space-4)'}}><button className="btn btn-secondary"><i className="fa-solid fa-key"></i> Alterar Senha</button></div>
        </div></div>
      </div>
    </>
  );
}
