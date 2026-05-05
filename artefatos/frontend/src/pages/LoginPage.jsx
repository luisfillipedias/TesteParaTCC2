import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockLogin } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('medico');

  const roles = [
    { value: 'medico', label: 'Médico', desc: 'CRM', icon: 'fa-user-doctor', bg: 'var(--clr-secondary-light)', color: 'var(--clr-secondary)' },
    { value: 'paciente', label: 'Paciente', desc: 'CPF/CNS', icon: 'fa-user', bg: 'var(--clr-primary-light)', color: 'var(--clr-primary)' },
    { value: 'gestor', label: 'Gestor', desc: 'Institucional', icon: 'fa-chart-bar', bg: 'var(--clr-accent-light)', color: 'var(--clr-accent)' },
    { value: 'admin', label: 'Admin', desc: 'Sistema', icon: 'fa-gear', bg: 'var(--clr-bg-alt)', color: 'var(--clr-text-secondary)' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(mockLogin(selectedRole));
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-visual-content">
          <div className="lv-icon"><i className="fa-solid fa-heart-pulse"></i></div>
          <h2>Bem-vindo ao RegulaSUS</h2>
          <p>Sistema integrado de regulação do SUS para gestão de procedimentos eletivos e transporte ambulatorial.</p>
          <div style={{display:'flex',gap:'var(--space-6)',justifyContent:'center',marginTop:'var(--space-8)'}}>
            <div style={{textAlign:'center'}}><div style={{fontSize:'var(--text-2xl)',fontWeight:800}}>156</div><div style={{fontSize:'var(--text-xs)',opacity:.6}}>Na Fila</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:'var(--text-2xl)',fontWeight:800}}>89</div><div style={{fontSize:'var(--text-xs)',opacity:.6}}>Atendidos</div></div>
            <div style={{textAlign:'center'}}><div style={{fontSize:'var(--text-2xl)',fontWeight:800}}>48</div><div style={{fontSize:'var(--text-xs)',opacity:.6}}>Médicos</div></div>
          </div>
        </div>
      </div>
      <div className="login-form-side">
        <div className="login-form-container">
          <div className="login-brand">
            <i className="fa-solid fa-heart-pulse"></i>
            Regula<span style={{fontWeight:400,opacity:.6}}>SUS</span>
          </div>
          <h1>Entrar no sistema</h1>
          <p className="login-subtitle">Selecione seu perfil e insira suas credenciais.</p>

          <div className="role-selector">
            {roles.map((r) => (
              <label key={r.value} className={`role-option${selectedRole === r.value ? ' selected' : ''}`} onClick={() => setSelectedRole(r.value)}>
                <input type="radio" name="role" value={r.value} checked={selectedRole === r.value} readOnly />
                <div className="role-icon" style={{background:r.bg,color:r.color}}><i className={`fa-solid ${r.icon}`}></i></div>
                <div><div className="role-name">{r.label}</div><div className="role-desc">{r.desc}</div></div>
              </label>
            ))}
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">E-mail ou CPF</label>
              <input type="text" className="form-control" placeholder="seu@email.com" defaultValue="carlos@sus.gov.br" />
            </div>
            <div className="form-group">
              <label className="form-label">Senha</label>
              <input type="password" className="form-control" placeholder="••••••••" defaultValue="12345678" />
            </div>
            <div className="form-footer">
              <label><input type="checkbox" defaultChecked /> Lembrar de mim</label>
              <a href="#">Esqueci a senha</a>
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-full" id="loginBtn">
              <i className="fa-solid fa-right-to-bracket"></i> Entrar
            </button>
          </form>
          <p style={{textAlign:'center',marginTop:'var(--space-6)',fontSize:'var(--text-xs)',color:'var(--clr-text-muted)'}}>
            <Link to="/" style={{color:'var(--clr-primary)'}}><i className="fa-solid fa-arrow-left"></i> Voltar ao site</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
