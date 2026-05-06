import { useState } from 'react';

export default function MedicoNovaSolicitacao() {
  const [pacienteBusca, setPacienteBusca] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const buscarPaciente = (e) => {
    e.preventDefault();
    if (pacienteBusca) {
      // Dummy logic for prototype
      setPacienteSelecionado({
        nome: pacienteBusca,
        cpf: '***.***.***-**',
        idade: 'N/A',
        cns: 'N/A',
        solicitacoesAtivas: 0
      });
    }
  };

  return (
    <>
      <h1 className="page-title">Nova Solicitação</h1>
      <p className="page-subtitle">Preencha os dados para solicitar um procedimento ou transporte ambulatorial.</p>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'var(--space-6)',alignItems:'start'}}>
        <div className="card animate-fade-in-up">
          <div className="card-header"><h3><i className="fa-solid fa-file-medical" style={{color:'var(--clr-primary)',marginRight:8}}></i> Dados da Solicitação</h3></div>
          <div className="card-body">
            <form>
              <div className="form-group"><label className="form-label">Tipo de Solicitação <span className="required">*</span></label><select className="form-control form-select"><option>Procedimento Eletivo</option><option>Transporte Ambulatorial</option><option>Exame de Imagem</option><option>Exame Laboratorial</option><option>Consulta Especializada</option></select></div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Paciente <span className="required">*</span></label>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <input type="text" className="form-control" placeholder="Nome ou CPF" value={pacienteBusca} onChange={(e) => setPacienteBusca(e.target.value)} />
                    <button type="button" className="btn btn-secondary" onClick={buscarPaciente}><i className="fa-solid fa-search"></i></button>
                  </div>
                </div>
                <div className="form-group"><label className="form-label">Cartão SUS</label><input type="text" className="form-control" placeholder="Nº do CNS" /></div>
              </div>
              <div className="form-group"><label className="form-label">Procedimento / Especialidade <span className="required">*</span></label><select className="form-control form-select"><option>Selecione...</option><option>Consulta Cardiologia</option><option>Cirurgia Ortopédica</option><option>Ressonância Magnética</option><option>Tomografia</option><option>Consulta Neurologia</option><option>Exame Laboratorial</option></select></div>
              <div className="form-row"><div className="form-group"><label className="form-label">Prioridade <span className="required">*</span></label><select className="form-control form-select"><option>Selecione...</option><option>Alta — Urgência</option><option>Média — Necessário</option><option>Baixa — Eletivo</option></select></div><div className="form-group"><label className="form-label">Unidade de Destino</label><select className="form-control form-select"><option>Selecione (Opcional)</option><option>Hospital Regional de BH</option><option>Hospital Estadual</option><option>Clínica São Lucas</option><option>UPA Norte</option></select></div></div>
              <div className="form-row"><div className="form-group"><label className="form-label">CID-10</label><input type="text" className="form-control" placeholder="Ex: I25.1" /></div><div className="form-group"><label className="form-label">Data Preferencial</label><input type="date" className="form-control" /></div></div>
              <div className="form-group"><label className="form-label">Justificativa Clínica <span className="required">*</span></label><textarea className="form-control" rows="4" placeholder="Descreva a justificativa médica..."></textarea></div>
              <div className="form-group"><label className="form-label">Necessita Transporte Ambulatorial?</label><select className="form-control form-select"><option>Não</option><option>Sim — Ambulância</option><option>Sim — Van adaptada</option></select></div>
              <div style={{display:'flex',gap:'var(--space-3)',justifyContent:'flex-end',marginTop:'var(--space-4)'}}>
                <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>Cancelar</button>
                <button type="submit" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); alert('Solicitação enviada para fila do gestor!'); }}><i className="fa-solid fa-paper-plane"></i> Enviar Solicitação</button>
              </div>
            </form>
          </div>
        </div>
        <div className="animate-fade-in-up delay-2">
          <div className="card" style={{marginBottom:'var(--space-5)'}}>
            <div className="card-header"><h3>Dicas</h3></div>
            <div className="card-body"><div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
              {[{n:'1',bg:'var(--clr-primary-light)',c:'var(--clr-primary)',t:'Prioridade',d:'Defina a prioridade conforme a urgência clínica do paciente.'},{n:'2',bg:'var(--clr-secondary-light)',c:'var(--clr-secondary)',t:'Justificativa',d:'Uma justificativa clara agiliza a aprovação da regulação.'},{n:'3',bg:'var(--clr-accent-light)',c:'var(--clr-accent)',t:'Transporte',d:'Solicite transporte apenas quando o paciente não tiver condições de locomoção.'}].map((d,i) => (
                <div style={{display:'flex',gap:'var(--space-3)'}} key={i}><div style={{width:32,height:32,borderRadius:'var(--radius-full)',background:d.bg,color:d.c,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'var(--text-xs)',fontWeight:700}}>{d.n}</div><div><div style={{fontWeight:600,fontSize:'var(--text-sm)',marginBottom:2}}>{d.t}</div><div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)'}}>{d.d}</div></div></div>
              ))}
            </div></div>
          </div>
          <div className="card">
            <div className="card-header"><h3>Paciente Selecionado</h3></div>
            <div className="card-body">
              {pacienteSelecionado ? (
                <>
                  <div style={{textAlign:'center',marginBottom:'var(--space-4)'}}>
                    <div style={{width:56,height:56,borderRadius:'var(--radius-full)',background:'var(--grad-primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-3)',fontWeight:700,fontSize:'var(--text-lg)'}}>
                      {pacienteSelecionado.nome.substring(0,2).toUpperCase()}
                    </div>
                    <div style={{fontWeight:700}}>{pacienteSelecionado.nome}</div>
                    <div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)'}}>CPF: {pacienteSelecionado.cpf}</div>
                  </div>
                  <div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}><span>Idade:</span><strong style={{color:'var(--clr-text)'}}>{pacienteSelecionado.idade}</strong></div>
                    <div style={{display:'flex',justifyContent:'space-between'}}><span>CNS:</span><strong style={{color:'var(--clr-text)'}}>{pacienteSelecionado.cns}</strong></div>
                    <div style={{display:'flex',justifyContent:'space-between'}}><span>Solicitações ativas:</span><strong style={{color:'var(--clr-text)'}}>{pacienteSelecionado.solicitacoesAtivas}</strong></div>
                  </div>
                </>
              ) : (
                <div style={{textAlign: 'center', color: 'var(--clr-text-muted)', padding: 'var(--space-4) 0'}}>
                  Busque e selecione um paciente para ver seus detalhes.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
