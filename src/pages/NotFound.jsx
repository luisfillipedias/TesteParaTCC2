import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './../assets/css/landing.css';

export default function NotFound() {
  const navigate = useNavigate();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <div className="gov-portal-container">
      {/* 1. MAIN HEADER */}
      <header className="gov-portal-header">
        <div className="gov-portal-header-content">
          <div className="gov-portal-logo-wrapper">
            <div className="gov-portal-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <img src="/govbr-logo.png" alt="Logomarca GovBR" />
            </div>
          </div>
          <div className="gov-portal-actions">
            <div className="gov-portal-links hide-mobile">
              <a href="https://www.gov.br/pt-br/orgaos-do-governo">Órgãos do Governo</a>
              <a href="https://www.gov.br/acessoainformacao/pt-br">Acesso à Informação</a>
              <a href="http://www4.planalto.gov.br/legislacao/">Legislação</a>
              <a href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital">Acessibilidade</a>
            </div>
            <div className="gov-portal-lang-selector hide-mobile" onClick={() => setLangMenuOpen(!langMenuOpen)}>
              <span>PT</span>
              <button className={`langue-button ${langMenuOpen ? 'active' : ''}`} type="button">
                <i className={`fas fa-angle-${langMenuOpen?'up':'down'}`} style={{fontSize:'12px'}}></i>
              </button>
            </div>
            <div className="gov-portal-contrast-toggle" onClick={() => window.toggleContrast()} style={{cursor: 'pointer'}} title="Alto Contraste">
              <i className="fa-solid fa-circle-half-stroke"></i>
            </div>
            <button className="gov-portal-btn-login" onClick={() => navigate('/login')}>
              <i className="fa-solid fa-user"></i> Entrar com gov.br
            </button>
          </div>
        </div>
      </header>

      {/* 2. SUB HEADER */}
      <div className="gov-portal-subheader">
        <div className="gov-portal-subheader-content">
          <div className="gov-portal-services-menu" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <i className="fa-solid fa-bars"></i>
            <span>Serviços e Informações do Brasil</span>
          </div>
          <div className="gov-portal-subheader-search">
            <div className="gov-portal-search-form">
              <input type="text" placeholder="O que você procura?" readOnly />
              <div className="gov-portal-search-icons">
                <button type="button" className="gov-search-mic-btn"><i className="fa-solid fa-microphone"></i></button>
                <button type="button" className="gov-search-icon-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT (MATCHING SCREENSHOT) */}
      <main className="gov-portal-main" style={{ padding: 'var(--space-12) var(--space-4)', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ 
            fontSize: 'var(--text-4xl)', 
            color: '#1351b4', 
            fontWeight: '600',
            marginBottom: 'var(--space-8)'
          }}>
            Desculpe, mas esta página não existe...
          </h1>

          <div style={{ color: '#333', fontSize: 'var(--text-lg)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: 'var(--space-6)' }}>
              Pedimos desculpas pelo inconveniente, mas a página que você estava tentando acessar não existe neste endereço.
            </p>
            <p style={{ marginBottom: 'var(--space-6)' }}>
              Se você está certo que o endereço informado está correto mas está encontrando um erro, por favor contate a <a href="#" style={{ color: '#1351b4', textDecoration: 'underline' }}>Administração do Site</a>.
            </p>
            <p>Obrigado.</p>
          </div>
        </div>
      </main>

      {/* 4. FOOTER (SIMPLIFIED) */}
      <footer className="gov-portal-footer" style={{ background: '#f8f8f8', borderTop: '1px solid #ddd', padding: 'var(--space-8) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <img 
            src="https://www.gov.br/++resource++brasil.gov.portal/img/logo-governo-federal.png" 
            alt="Governo Federal" 
            style={{ height: '40px', opacity: 0.6 }}
          />
        </div>
      </footer>
    </div>
  );
}
