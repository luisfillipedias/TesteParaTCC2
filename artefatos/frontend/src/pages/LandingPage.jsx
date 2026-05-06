import { useNavigate } from 'react-router-dom';
import './../assets/css/landing.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="gov-portal-container">
      {/* 1. TOP HEADER — thin bar with gov.br links (Órgãos, Acesso, Legislação) */}
      <header className="gov-portal-header">
        <div className="gov-portal-header-content">
          <div className="gov-portal-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <img src="/govbr-logo.png" alt="Logomarca GovBR" />
          </div>
          <div className="gov-portal-links hide-mobile">
            <a href="https://www.gov.br/pt-br/orgaos-do-governo" target="_blank" rel="noopener noreferrer">Órgãos do Governo</a>
            <a href="https://www.gov.br/acessoainformacao/pt-br" target="_blank" rel="noopener noreferrer">Acesso à Informação</a>
            <a href="http://www4.planalto.gov.br/legislacao/" target="_blank" rel="noopener noreferrer">Legislação</a>
            <a href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital" target="_blank" rel="noopener noreferrer">Acessibilidade</a>
          </div>
          <div className="gov-portal-actions">
            <span className="hide-mobile">PT <i className="fa-solid fa-chevron-down" style={{fontSize:'8px'}}></i></span>
            <span><i className="fa-solid fa-circle-half-stroke"></i></span>
            <span><a href="https://www.vlibras.gov.br" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-ear-listen"></i></a></span>
            <button className="gov-portal-btn-login" onClick={() => navigate('/login')}>
              <i className="fa-solid fa-user"></i> Entrar com gov.br
            </button>
          </div>
        </div>
      </header>

      {/* 2. SUB HEADER — "Serviços e Informações do Brasil" (no search here) */}
      <div className="gov-portal-subheader">
        <div className="gov-portal-subheader-content">
          <div className="gov-portal-services-menu">
            <i className="fa-solid fa-bars"></i>
            <span>Serviços e Informações do Brasil</span>
          </div>
        </div>
      </div>

      {/* 3. SEARCH BAR — standalone large search component */}
      <div className="gov-portal-search-section">
        <div className="gov-portal-search-wrapper">
          <div className="gov-portal-search">
            <button className="gov-search-icon-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" placeholder="O que você procura?" />
            <button className="gov-search-mic-btn"><i className="fa-solid fa-microphone"></i></button>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT */}
      <main className="gov-portal-main">
        {/* "Serviços para você" heading */}
        <h2 className="gov-portal-section-title">Serviços para você</h2>

        <div className="gov-portal-breadcrumbs">
          <i className="fa-solid fa-house"></i>
          <i className="fa-solid fa-chevron-right"></i>
          <span>Temas</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span>RegulaSUS</span>
        </div>

        <div className="gov-portal-title-section">
          <span className="gov-portal-badge-novo">Novo</span>
          <h1>RegulaSUS</h1>
          <p>Sistema Integrado de Regulação do SUS para gestão de procedimentos eletivos e transporte ambulatorial.</p>
        </div>

        <div className="gov-portal-cards-grid">
          <div className="gov-portal-card" onClick={() => navigate('/login')}>
            <div className="gpc-icon">
              <i className="fa-regular fa-id-card"></i>
            </div>
            <h2>ACESSAR O SISTEMA</h2>
            <p>Faça login com sua conta gov.br para acompanhar suas solicitações ou gerenciar a regulação.</p>
          </div>

          <div className="gov-portal-card" onClick={() => window.open('https://www.gov.br/governodigital/pt-br/conta-gov-br/ajuda-da-conta-gov.br', '_blank')}>
            <div className="gpc-icon">
              <i className="fa-solid fa-circle-question"></i>
            </div>
            <h2>PERGUNTAS FREQUENTES</h2>
            <p>Tire suas dúvidas sobre agendamentos de consultas, cirurgias eletivas e transporte.</p>
          </div>

          <div className="gov-portal-card">
            <div className="gpc-icon">
              <i className="fa-solid fa-shoe-prints"></i>
            </div>
            <h2>PASSO A PASSO</h2>
            <p>Veja como acessar o RegulaSUS pela Web ou pelo Aplicativo móvel.</p>
          </div>

          <div className="gov-portal-card">
            <div className="gpc-icon">
              <i className="fa-solid fa-mobile-screen"></i>
            </div>
            <h2>BAIXE O APLICATIVO</h2>
            <div className="gpc-links">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">Android</a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">iOS</a>
            </div>
          </div>
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer className="gov-portal-footer">
        <div className="gov-portal-footer-content">
          {/* gov.br footer placeholder */}
        </div>
      </footer>
    </div>
  );
}
