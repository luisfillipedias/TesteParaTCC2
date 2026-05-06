import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './../assets/css/landing.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `https://www.gov.br/pt-br/search?origem=form&SearchableText=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <div className="gov-portal-container">
      {/* 1. TOP HEADER — thin bar with gov.br links (Órgãos, Acesso, Legislação) */}
      <header className="gov-portal-header">
        <div className="gov-portal-header-content">
          <div className="gov-portal-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <img src="/govbr-logo.png" alt="Logomarca GovBR" />
          </div>
          <div className="gov-portal-links hide-mobile">
            <a href="https://www.gov.br/pt-br/orgaos-do-governo">Órgãos do Governo</a>
            <a href="https://www.gov.br/acessoainformacao/pt-br">Acesso à Informação</a>
            <a href="http://www4.planalto.gov.br/legislacao/">Legislação</a>
            <a href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital">Acessibilidade</a>
          </div>
          <div className="gov-portal-actions">
            <span className="hide-mobile">PT <i className="fa-solid fa-chevron-down" style={{fontSize:'8px'}}></i></span>
            <span><i className="fa-solid fa-circle-half-stroke"></i></span>
            <span><a href="https://www.vlibras.gov.br"><i className="fa-solid fa-ear-listen"></i></a></span>
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
          <form className="gov-portal-search" onSubmit={handleSearch}>
            <button type="submit" className="gov-search-icon-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            <input 
              type="text" 
              placeholder="O que você procura?" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="button" className="gov-search-mic-btn"><i className="fa-solid fa-microphone"></i></button>
          </form>
        </div>
      </div>

      {/* 4. MAIN CONTENT */}
      <main className="gov-portal-main">
        {/* "Serviços para você" heading */}
        <h2 className="gov-portal-section-title">Serviços para você</h2>

        <div className="gov-portal-breadcrumbs">
          <i className="fa-solid fa-house"></i>
          <i className="fa-solid fa-chevron-right"></i>
          <a href="https://www.gov.br/pt-br/temas" style={{color: 'var(--clr-primary)', textDecoration: 'none'}}>Temas</a>
          <i className="fa-solid fa-chevron-right"></i>
          <span>RegulaSUS</span>
        </div>

        <div className="gov-portal-title-section">
          <span className="gov-portal-badge-novo">Novo</span>
          <div style={{marginBottom: 'var(--space-4)'}}>
            <img src="/logo-regulasus.svg" alt="RegulaSUS Logo" style={{height: '64px', width: 'auto'}} />
          </div>
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

          <div className="gov-portal-card" onClick={() => window.location.href = 'https://www.gov.br/governodigital/pt-br/conta-gov-br/ajuda-da-conta-gov.br'}>
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
              <a href="https://play.google.com/store">Android</a>
              <a href="https://apps.apple.com">iOS</a>
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
