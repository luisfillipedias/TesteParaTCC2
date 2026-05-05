export default function MedicoHistorico() {
  return (
    <>
      <h1 className="page-title">Histórico do Paciente</h1>
      <p className="page-subtitle">Consulte o prontuário e histórico de atendimentos do paciente.</p>
      <div className="card" style={{marginBottom:'var(--space-6)'}}><div className="card-body" style={{display:'flex',gap:'var(--space-4)',alignItems:'end',flexWrap:'wrap'}}><div style={{flex:1,minWidth:250}}><label className="form-label">Buscar Paciente</label><div className="table-search" style={{width:'100%'}}><i className="fa-solid fa-search"></i><input type="text" placeholder="Nome, CPF ou Cartão SUS..." defaultValue="Maria da Silva" /></div></div><button className="btn btn-primary"><i className="fa-solid fa-search"></i> Consultar</button></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'var(--space-6)',alignItems:'start'}}>
        <div className="card animate-fade-in-up">
          <div className="card-body" style={{textAlign:'center'}}>
            <div style={{width:72,height:72,borderRadius:'var(--radius-full)',background:'var(--grad-primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-3)',fontWeight:700,fontSize:'var(--text-xl)'}}>MS</div>
            <h3 style={{fontSize:'var(--text-md)',marginBottom:2}}>Maria da Silva</h3>
            <p style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',marginBottom:'var(--space-4)'}}>CPF: ***.456.789-01</p>
            <div style={{textAlign:'left',fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Idade:</span><strong style={{color:'var(--clr-text)'}}>58 anos</strong></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>CNS:</span><strong style={{color:'var(--clr-text)'}}>898 0012 3456 7890</strong></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Tipo Sanguíneo:</span><strong style={{color:'var(--clr-text)'}}>O+</strong></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Alergias:</span><strong style={{color:'var(--clr-danger)'}}>Dipirona</strong></div>
            </div>
          </div>
        </div>
        <div className="card animate-fade-in-up delay-1">
          <div className="card-header"><h3><i className="fa-solid fa-clock-rotate-left" style={{color:'var(--clr-secondary)',marginRight:8}}></i> Histórico de Atendimentos</h3></div>
          <div className="card-body" style={{padding:0}}>
            <div style={{overflowX:'auto'}}>
            <table className="data-table"><thead><tr><th>Data</th><th>Procedimento</th><th>Médico</th><th>Unidade</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  {d:'02/05/2026',p:'Consulta Cardiologia',m:'Dr. Carlos Andrade',u:'Hospital Regional',st:'Aguardando',c:'badge-warning badge-dot'},
                  {d:'15/03/2026',p:'Exame Laboratorial',m:'Dra. Ana Costa',u:'Clínica São Lucas',st:'Concluído',c:'badge-primary badge-dot'},
                  {d:'20/01/2026',p:'Consulta Clínica Geral',m:'Dr. Paulo Reis',u:'UBS Centro',st:'Concluído',c:'badge-primary badge-dot'},
                  {d:'05/11/2025',p:'Eletrocardiograma',m:'Dr. Carlos Andrade',u:'Hospital Regional',st:'Concluído',c:'badge-primary badge-dot'},
                  {d:'18/08/2025',p:'Raio-X Tórax',m:'Dra. Ana Costa',u:'Hospital Estadual',st:'Concluído',c:'badge-primary badge-dot'},
                ].map((r,i) => <tr key={i}><td>{r.d}</td><td><strong>{r.p}</strong></td><td>{r.m}</td><td>{r.u}</td><td><span className={`badge ${r.c}`}>{r.st}</span></td></tr>)}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
