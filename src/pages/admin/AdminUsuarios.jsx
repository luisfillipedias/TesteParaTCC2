import { useState, useEffect, useCallback } from 'react';
import { getUsuarios, getStats, createUsuario, updateUsuario, deleteUsuario } from '../../services/api';

const perfilCls = { 'Médico':'badge-info', 'Paciente':'badge-primary', 'Gestor Municipal':'badge-warning', 'Secretária':'badge-secondary', 'Administrador':'badge-danger' };

export default function AdminUsuarios() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [busca, setBusca] = useState('');
  const [filtroPerfil, setFiltroPerfil] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  // Create form
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', perfil: 'Paciente', senha: '', confirmarSenha: '', telefone: ''
  });

  // Edit form
  const [editData, setEditData] = useState({
    id: null, nome: '', email: '', perfil: '', status: '', telefone: '', crm: '', especialidade: '', unidade: '', cns: '', data_nascimento: '', matricula: '', novaSenha: ''
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [userData, statsData] = await Promise.all([
        getUsuarios({ busca, perfil: filtroPerfil, status: filtroStatus }),
        getStats('admin')
      ]);
      setUsuarios(userData || []);
      setStats(statsData || {});
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    } finally {
      setLoading(false);
    }
  }, [busca, filtroPerfil, filtroStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Debounced search
  const [searchTimer, setSearchTimer] = useState(null);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setBusca(value);
    if (searchTimer) clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => {}, 300));
  };

  const handleCreate = async () => {
    if (!formData.nome || !formData.email || !formData.cpf || !formData.senha) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    setSubmitting(true);
    try {
      await createUsuario({
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        perfil: formData.perfil,
        senha: formData.senha,
        telefone: formData.telefone
      });
      setModal(false);
      setFormData({ nome: '', email: '', cpf: '', perfil: 'Paciente', senha: '', confirmarSenha: '', telefone: '' });
      alert('✅ Usuário cadastrado com sucesso!');
      await loadData();
    } catch (error) {
      alert('❌ ' + (error.message || 'Erro ao cadastrar usuário.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditData({
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      status: user.status,
      telefone: user.telefone || '',
      crm: user.crm || '',
      especialidade: user.especialidade || '',
      unidade: user.unidade || '',
      cns: user.cns || '',
      data_nascimento: user.data_nascimento || '',
      matricula: user.matricula || '',
      novaSenha: ''
    });
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editData.nome || !editData.email) {
      alert('Nome e e-mail são obrigatórios.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...editData };
      if (payload.novaSenha) {
        payload.senha = payload.novaSenha;
      }
      delete payload.novaSenha;
      delete payload.id;

      await updateUsuario(editData.id, payload);
      setEditModal(false);
      alert('✅ Usuário atualizado com sucesso!');
      await loadData();
    } catch (error) {
      alert('❌ ' + (error.message || 'Erro ao atualizar usuário.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${user.nome}"?\nEsta ação não pode ser desfeita.`)) {
      return;
    }
    try {
      await deleteUsuario(user.id);
      alert('✅ Usuário excluído com sucesso!');
      await loadData();
    } catch (error) {
      alert('❌ ' + (error.message || 'Erro ao excluir usuário.'));
    }
  };

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'var(--space-4)',marginBottom:'var(--space-6)'}}>
        <div><h1 className="page-title" style={{marginBottom:4}}>Gerenciar Usuários</h1><p className="page-subtitle" style={{margin:0}}>Cadastro e gerenciamento de usuários do sistema.</p></div>
        <button className="btn btn-primary" onClick={() => setModal(true)}><i className="fa-solid fa-user-plus"></i> Novo Usuário</button>
      </div>
      <div className="dashboard-grid" style={{marginBottom:'var(--space-6)'}}>
        <div className="stat-card animate-fade-in-up"><div className="stat-icon green"><i className="fa-solid fa-users"></i></div><div className="stat-label">Total de Usuários</div><div className="stat-value">{stats.usuarios || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-1"><div className="stat-icon blue"><i className="fa-solid fa-user-check"></i></div><div className="stat-label">Ativos</div><div className="stat-value">{stats.ativos || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-2"><div className="stat-icon orange"><i className="fa-solid fa-user-plus"></i></div><div className="stat-label">Novos este mês</div><div className="stat-value">{stats.novosMes || 0}</div></div>
        <div className="stat-card animate-fade-in-up delay-3"><div className="stat-icon blue"><i className="fa-solid fa-user-doctor"></i></div><div className="stat-label">Médicos Cadastrados</div><div className="stat-value">{stats.medicos || 0}</div></div>
      </div>
      <div className="table-container animate-fade-in-up delay-2">
        <div className="table-header">
          <div className="table-search">
            <i className="fa-solid fa-search"></i>
            <input type="text" placeholder="Buscar usuário..." value={busca} onChange={handleSearchChange} />
          </div>
          <div className="filter-bar">
            <select className="filter-select" value={filtroPerfil} onChange={(e) => setFiltroPerfil(e.target.value)}>
              <option value="">Todos os perfis</option>
              <option>Médico</option>
              <option>Paciente</option>
              <option>Gestor Municipal</option>
              <option>Secretária</option>
              <option>Administrador</option>
            </select>
            <select className="filter-select" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
              <option value="">Status</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
        <table className="data-table"><thead><tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Criado em</th><th>Ações</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{textAlign:'center', padding:'var(--space-4)'}}>Carregando usuários...</td></tr>
            ) : usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td style={{color:'var(--clr-text-muted)'}}>#{u.id}</td>
                  <td><strong>{u.nome}</strong></td>
                  <td>{u.email}</td>
                  <td><span className={`badge ${perfilCls[u.perfil]||'badge-secondary'}`}>{u.perfil}</span></td>
                  <td><span className={`badge ${u.status==='Ativo'?'badge-success':'badge-danger'} badge-dot`}>{u.status}</span></td>
                  <td>{u.criado}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(u)} title="Editar"><i className="fa-solid fa-pen"></i></button>
                    {' '}
                    <button className="btn btn-ghost btn-sm" style={{color:'var(--clr-danger)'}} onClick={() => handleDelete(u)} title="Excluir"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{textAlign:'center', padding:'var(--space-4)', color:'var(--clr-text-muted)'}}>Nenhum usuário encontrado.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      <div className={`modal-overlay${modal?' active':''}`}><div className="modal">
        <div className="modal-header"><h3>Cadastrar Novo Usuário</h3><button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><i className="fa-solid fa-xmark"></i></button></div>
        <div className="modal-body">
          <div className="form-group"><label className="form-label">Nome Completo <span className="required">*</span></label><input type="text" className="form-control" placeholder="Nome do usuário" value={formData.nome} onChange={(e)=>setFormData({...formData, nome: e.target.value})} /></div>
          <div className="form-group"><label className="form-label">E-mail <span className="required">*</span></label><input type="email" className="form-control" placeholder="email@exemplo.com" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">CPF <span className="required">*</span></label><input type="text" className="form-control" placeholder="000.000.000-00" value={formData.cpf} onChange={(e)=>setFormData({...formData, cpf: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Perfil <span className="required">*</span></label>
              <select className="form-control form-select" value={formData.perfil} onChange={(e)=>setFormData({...formData, perfil: e.target.value})}>
                <option>Paciente</option><option>Médico</option><option>Gestor Municipal</option><option>Secretária</option><option>Administrador</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label className="form-label">Telefone</label><input type="text" className="form-control" placeholder="(00) 00000-0000" value={formData.telefone} onChange={(e)=>setFormData({...formData, telefone: e.target.value})} /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Senha <span className="required">*</span></label><input type="password" className="form-control" placeholder="••••••••" value={formData.senha} onChange={(e)=>setFormData({...formData, senha: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Confirmar Senha <span className="required">*</span></label><input type="password" className="form-control" placeholder="••••••••" value={formData.confirmarSenha} onChange={(e)=>setFormData({...formData, confirmarSenha: e.target.value})} /></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleCreate} disabled={submitting}>
            <i className="fa-solid fa-user-plus"></i> {submitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </div></div>

      {/* EDIT MODAL */}
      <div className={`modal-overlay${editModal?' active':''}`}><div className="modal">
        <div className="modal-header"><h3>Editar Usuário #{editData.id}</h3><button className="btn btn-ghost btn-icon" onClick={() => setEditModal(false)}><i className="fa-solid fa-xmark"></i></button></div>
        <div className="modal-body">
          <div className="form-group"><label className="form-label">Nome Completo</label><input type="text" className="form-control" value={editData.nome} onChange={(e)=>setEditData({...editData, nome: e.target.value})} /></div>
          <div className="form-group"><label className="form-label">E-mail</label><input type="email" className="form-control" value={editData.email} onChange={(e)=>setEditData({...editData, email: e.target.value})} /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Perfil</label>
              <select className="form-control form-select" value={editData.perfil} onChange={(e)=>setEditData({...editData, perfil: e.target.value})}>
                <option>Paciente</option><option>Médico</option><option>Gestor Municipal</option><option>Secretária</option><option>Administrador</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Status</label>
              <select className="form-control form-select" value={editData.status} onChange={(e)=>setEditData({...editData, status: e.target.value})}>
                <option>Ativo</option><option>Inativo</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label className="form-label">Telefone</label><input type="text" className="form-control" value={editData.telefone} onChange={(e)=>setEditData({...editData, telefone: e.target.value})} /></div>
          {editData.perfil === 'Médico' && (
            <div className="form-row">
              <div className="form-group"><label className="form-label">CRM</label><input type="text" className="form-control" value={editData.crm} onChange={(e)=>setEditData({...editData, crm: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Especialidade</label><input type="text" className="form-control" value={editData.especialidade} onChange={(e)=>setEditData({...editData, especialidade: e.target.value})} /></div>
            </div>
          )}
          {editData.perfil === 'Paciente' && (
            <div className="form-row">
              <div className="form-group"><label className="form-label">Cartão SUS (CNS)</label><input type="text" className="form-control" value={editData.cns} onChange={(e)=>setEditData({...editData, cns: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Data de Nascimento</label><input type="text" className="form-control" value={editData.data_nascimento} onChange={(e)=>setEditData({...editData, data_nascimento: e.target.value})} /></div>
            </div>
          )}
          {editData.perfil === 'Gestor Municipal' && (
            <div className="form-group"><label className="form-label">Matrícula</label><input type="text" className="form-control" value={editData.matricula} onChange={(e)=>setEditData({...editData, matricula: e.target.value})} /></div>
          )}
          <hr style={{margin:'var(--space-4) 0', borderColor:'var(--clr-border)'}} />
          <div className="form-group"><label className="form-label">Nova Senha (deixe em branco para manter)</label><input type="password" className="form-control" placeholder="••••••••" value={editData.novaSenha} onChange={(e)=>setEditData({...editData, novaSenha: e.target.value})} /></div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setEditModal(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSaveEdit} disabled={submitting}>
            <i className="fa-solid fa-floppy-disk"></i> {submitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div></div>
    </>
  );
}
