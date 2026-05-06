import { useState, useEffect } from 'react';
import { getPerfil, updatePerfil, changePassword, getSessionUser, setSession } from '../../services/api';
import { maskPhone, maskCns, maskDate, validateEmail, validateDate } from '../../utils/masks';

export default function PacientePerfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [pwModal, setPwModal] = useState(false);
  const [pwForm, setPwForm] = useState({ senhaAtual: '', novaSenha: '', confirmar: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState('');

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    try {
      const data = await getPerfil();
      setUser(data);
      setForm({ 
        nome: data.nome, 
        email: data.email, 
        telefone: maskPhone(data.telefone || ''), 
        cns: maskCns(data.cns || ''), 
        data_nascimento: maskDate(data.data_nascimento || '') 
      });
    } catch (err) { console.error(err); } finally { setLoading(false); }
  }

  async function handleSave() {
    // Validação de padrões
    if (!form.nome || form.nome.trim().length < 3) return alert('❌ Nome completo é obrigatório.');
    if (!validateEmail(form.email)) return alert('❌ E-mail inválido.');
    
    if (form.telefone && form.telefone.replace(/\D/g, '').length < 10) {
      return alert('❌ Telefone incompleto. Use (00) 00000-0000');
    }
    
    if (form.cns && form.cns.replace(/\D/g, '').length < 15) {
      return alert('❌ Cartão SUS deve ter 15 dígitos.');
    }
    
    if (form.data_nascimento && !validateDate(form.data_nascimento)) {
      return alert('❌ Data de nascimento inválida. Use DD/MM/AAAA');
    }

    setSaving(true);
    try {
      const updated = await updatePerfil(form);
      setUser(updated); setEditing(false);
      
      const s = getSessionUser();
      if (s) {
        const updatedSession = { ...s, ...updated };
        updatedSession.permissions = s.permissions;
        setSession(sessionStorage.getItem('regulasus_token'), updatedSession);
      }
      
      alert('✅ Perfil atualizado com sucesso!');
    } catch (e) { 
      if (e.message.includes('expirada')) return;
      alert('❌ ' + e.message); 
    } finally { setSaving(false); }
  }

  async function handleChangePw() {
    setPwError('');
    if (!pwForm.senhaAtual || !pwForm.novaSenha) {
      setPwError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (pwForm.novaSenha !== pwForm.confirmar) {
      setPwError('As senhas não coincidem.');
      return;
    }
    setPwSaving(true);
    try {
      await changePassword(pwForm.senhaAtual, pwForm.novaSenha);
      setPwModal(false); setPwForm({ senhaAtual: '', novaSenha: '', confirmar: '' });
      alert('✅ Senha alterada com sucesso!');
    } catch (e) { setPwError(e.message); } finally { setPwSaving(false); }
  }

  if (loading) return <div style={{padding:'var(--space-8)',textAlign:'center',color:'var(--clr-text-muted)'}}>Carregando...</div>;
  if (!user) return <div style={{padding:'var(--space-8)',textAlign:'center',color:'var(--clr-danger)'}}>Erro ao carregar perfil.</div>;

  const initials = user.nome ? user.nome.split(/\s+/).filter(w=>w).map(w=>w[0]).join('').substring(0,2).toUpperCase() : 'PC';
  const cpfMask = user.cpf ? user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-$4') : '';
  const v = (field) => editing ? (form[field] ?? '') : (user[field] || '');

  const upd = (field) => (e) => {
    let val = e.target.value;
    if (field === 'telefone') val = maskPhone(val);
    else if (field === 'cns') val = maskCns(val);
    else if (field === 'data_nascimento') val = maskDate(val);
    setForm({...form, [field]: val});
  };

  return (
    <>
      <h1 className="page-title">Meu Perfil</h1>
      <p className="page-subtitle">Suas informações no RegulaSUS.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'var(--space-6)',alignItems:'start'}}>
        <div className="card animate-fade-in-up"><div className="card-body" style={{textAlign:'center',padding:'var(--space-8)'}}>
          <div style={{width:96,height:96,borderRadius:'var(--radius-full)',background:'var(--grad-primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto var(--space-4)',fontWeight:700,fontSize:'var(--text-3xl)'}}>{initials}</div>
          <h2 style={{fontSize:'var(--text-xl)',marginBottom:'var(--space-1)'}}>{user.nome}</h2>
          <span className="badge badge-primary" style={{marginBottom:'var(--space-4)'}}>Paciente</span>
          <div style={{fontSize:'var(--text-xs)',color:'var(--clr-text-secondary)',marginTop:'var(--space-3)'}}><p>CNS: {user.cns || 'Não informado'}</p><p>Membro desde {user.criado_em ? new Date(user.criado_em).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}) : 'N/A'}</p></div>
        </div></div>
        <div className="card animate-fade-in-up delay-1"><div className="card-header"><h3><i className="fa-solid fa-user-pen" style={{color:'var(--clr-primary)',marginRight:8}}></i> Dados Pessoais</h3></div><div className="card-body">
          <div className="form-row"><div className="form-group"><label className="form-label">Nome Completo</label><input type="text" className="form-control" value={v('nome')} readOnly={!editing} onChange={upd('nome')} /></div><div className="form-group"><label className="form-label">CPF</label><input type="text" className="form-control" value={cpfMask} readOnly /></div></div>
          <div className="form-row"><div className="form-group"><label className="form-label">E-mail</label><input type="email" className="form-control" value={v('email')} readOnly={!editing} onChange={upd('email')} /></div><div className="form-group"><label className="form-label">Telefone</label><input type="text" className="form-control" value={v('telefone')} readOnly={!editing} onChange={upd('telefone')} /></div></div>
          <div className="form-row"><div className="form-group"><label className="form-label">Cartão SUS</label><input type="text" className="form-control" value={v('cns')} readOnly={!editing} onChange={upd('cns')} placeholder={editing ? "000 0000 0000 0000" : ""} /></div><div className="form-group"><label className="form-label">Data de Nascimento</label><input type="text" className="form-control" value={v('data_nascimento')} readOnly={!editing} onChange={upd('data_nascimento')} placeholder={editing ? "DD/MM/AAAA" : ""} /></div></div>
          <div style={{display:'flex',gap:'var(--space-3)',justifyContent:'flex-end',marginTop:'var(--space-4)'}}>
            <button className="btn btn-secondary" onClick={()=>{setPwError(''); setPwModal(true);}}><i className="fa-solid fa-key"></i> Alterar Senha</button>
            {editing ? (<><button className="btn btn-secondary" onClick={()=>{setEditing(false);setForm({nome:user.nome,email:user.email,telefone:user.telefone||'',cns:user.cns||'',data_nascimento:user.data_nascimento||''});}}>Cancelar</button><button className="btn btn-primary" onClick={handleSave} disabled={saving}><i className="fa-solid fa-floppy-disk"></i> {saving?'Salvando...':'Salvar'}</button></>) : (<button className="btn btn-primary" onClick={()=>setEditing(true)}><i className="fa-solid fa-pen"></i> Editar Perfil</button>)}
          </div>
        </div></div>
      </div>
      <div className={`modal-overlay${pwModal?' active':''}`}><div className="modal">
        <div className="modal-header"><h3>Alterar Senha</h3><button className="btn btn-ghost btn-icon" onClick={()=>setPwModal(false)}><i className="fa-solid fa-xmark"></i></button></div>
        <div className="modal-body">
          {pwError && (
            <div style={{background:'rgba(var(--clr-danger-rgb), 0.1)', color:'var(--clr-danger)', padding:'var(--space-3)', borderRadius:'var(--radius-md)', marginBottom:'var(--space-4)', fontSize:'var(--text-sm)', display:'flex', alignItems:'center', gap:'var(--space-2)'}}>
              <i className="fa-solid fa-circle-exclamation"></i> {pwError}
            </div>
          )}
          <div className="form-group"><label className="form-label">Senha Atual *</label><input type="password" className="form-control" value={pwForm.senhaAtual} onChange={e=>setPwForm({...pwForm,senhaAtual:e.target.value})} /></div>
          <div className="form-group"><label className="form-label">Nova Senha *</label><input type="password" className="form-control" value={pwForm.novaSenha} onChange={e=>setPwForm({...pwForm,novaSenha:e.target.value})} /></div>
          <div className="form-group"><label className="form-label">Confirmar *</label><input type="password" className="form-control" value={pwForm.confirmar} onChange={e=>setPwForm({...pwForm,confirmar:e.target.value})} /></div>
        </div>
        <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setPwModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={handleChangePw} disabled={pwSaving}><i className="fa-solid fa-key"></i> {pwSaving?'Alterando...':'Alterar'}</button></div>
      </div></div>
    </>
  );
}
