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
      {/* 1. MAIN HEADER — Logo, Links, Actions */}
      <header className="gov-portal-header">
        <div className="gov-portal-header-content">
          <div className="gov-portal-logo-wrapper">
            <div className="gov-portal-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
              <img src="/govbr-logo.png" alt="Logomarca GovBR" />
            </div>
            <div className="gov-portal-links hide-mobile">
              <a href="https://www.gov.br/pt-br/orgaos-do-governo">Órgãos do Governo</a>
              <a href="https://www.gov.br/acessoainformacao/pt-br">Acesso à Informação</a>
              <a href="http://www4.planalto.gov.br/legislacao/">Legislação</a>
              <a href="https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital">Acessibilidade</a>
            </div>
          </div>
          <div className="gov-portal-actions">
            <div className="gov-portal-lang-selector hide-mobile">
              <span>PT</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="gov-portal-contrast-toggle">
              <i className="fa-solid fa-circle-half-stroke"></i>
            </div>
            <div className="gov-portal-vlibras">
              <a href="https://www.vlibras.gov.br" target="_blank" rel="noreferrer">
                <i className="fa-solid fa-ear-listen"></i>
              </a>
            </div>
            <button className="gov-portal-btn-login" onClick={() => navigate('/login')}>
              <i className="fa-solid fa-user"></i> Entrar com gov.br
            </button>
          </div>
        </div>
      </header>

      {/* 2. SUB HEADER — Services Menu + Search */}
      <div className="gov-portal-subheader">
        <div className="gov-portal-subheader-content">
          <div className="gov-portal-services-menu" onClick={() => window.location.href = 'https://www.gov.br/pt-br'} style={{cursor: 'pointer'}}>
            <i className="fa-solid fa-bars"></i>
            <span>Serviços e Informações do Brasil</span>
          </div>

          <div className="gov-portal-subheader-search">
            <form className="gov-portal-search-form" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="O que você procura?" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div className="gov-portal-search-icons">
                <button type="button" className="gov-search-mic-btn"><i className="fa-solid fa-microphone"></i></button>
                <button type="submit" className="gov-search-icon-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. HERO/MAIN CONTENT — Service Detail Page Layout */}
      <main className="gov-portal-main service-page">
        <div className="gov-portal-breadcrumbs">
          <i className="fa-solid fa-house"></i>
          <i className="fa-solid fa-chevron-right"></i>
          <a href="https://www.gov.br/pt-br/servicos">Serviços</a>
          <i className="fa-solid fa-chevron-right"></i>
          <span>RegulaSUS</span>
        </div>

        {/* Service Identification Block (Centered) */}
        <div className="gov-service-header-block">
          <div className="gov-service-category-icon">
            <i className="fa-solid fa-university"></i>
          </div>
          <h2 className="gov-service-parent-category">Saúde e Vigilância Sanitária</h2>
          <div className="gov-service-subcategories">
            <a href="#">Assistência Hospitalar e Ambulatorial</a>
            <i className="fa-solid fa-chevron-right"></i>
            <a href="#">Regulação do SUS</a>
          </div>
        </div>

        <div className="gov-service-main-content">
          <div className="gov-service-title-row">
            <div className="gov-service-info-col">
              <h1 className="gov-service-title">Acessar o RegulaSUS (Sistema Integrado)</h1>
              <p className="gov-service-description">
                "Sistema Integrado de Regulação do SUS para gestão de procedimentos eletivos e transporte ambulatorial."
              </p>
              
              <div className="gov-service-meta">
                <div className="gov-rating">
                  <span>Avaliação: 4.8</span>
                  <div className="stars">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                  </div>
                  <span className="rating-count">(1540)</span>
                </div>
                <div className="gov-last-update">
                  Última Modificação: 06/05/2026
                </div>
              </div>
            </div>

            <div className="gov-service-action-col">
              <button className="gov-btn-iniciar" onClick={() => navigate('/login')}>
                Iniciar
              </button>
            </div>
          </div>

          <div className="gov-service-accordion-section">
            <div className="gov-accordion-item">
              <div className="gov-accordion-header">
                <i className="fa-solid fa-chevron-down"></i>
                <h3>O que é?</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="gov-portal-cards-grid" style={{marginTop: '80px'}}>
          <div className="gov-portal-card" onClick={() => window.location.href = 'https://www.gov.br/governodigital/pt-br/conta-gov-br/ajuda-da-conta-gov.br'}>
            <div className="gpc-icon">
              <i className="fa-solid fa-circle-question"></i>
            </div>
            <h2>PERGUNTAS FREQUENTES</h2>
            <p>Tire suas dúvidas sobre agendamentos de consultas, cirurgias eletivas e transporte.</p>
          </div>

          <div className="gov-portal-card" onClick={() => window.location.href = 'https://www.gov.br/pt-br/servicos/acessar-o-regulasus'}>
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
              <a href="https://play.google.com/store/apps/details?id=br.gov.meugovbr">Android</a>
              <a href="https://apps.apple.com/br/app/meu-gov-br/id1504101712">iOS</a>
            </div>
          </div>
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer className="gov-portal-footer">
        <div className="gov-portal-footer-content">
          <div className="gov-portal-footer-logo-row">
            <img src="/govbr-logo.png" alt="GovBR Logo" className="footer-main-logo" />
          </div>
          
          <div className="gov-portal-footer-links-grid">
            <div className="footer-col">
              <h4 className="footer-col-title active">SUS</h4>
              <ul>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/noticias">Notícias</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/noticias-para-os-estados">Notícias para os estados</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z">Saúde de A a Z</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/agencia-saude">Agência Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/balancos-da-saude">Balanços da Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/cop30">COP30</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/meu-sus-digital">Meu SUS Digital</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/novo-pac-saude">Novo PAC Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas">Protocolos Clínicos e Diretrizes Terapêuticas</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/retomada-de-obras-da-saude">Retomada de obras da saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/saude-com-ciencia">Saúde com Ciência</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/saude-sem-racismo">Saúde sem Racismo</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/yanomami">Yanomami</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">ASSUNTOS</h4>
              <ul>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/atividades-de-vacinacao-de-alta-qualidade">Atividades de vacinação de alta qualidade</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/seguranca-das-vacinas">Segurança das Vacinas</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/vacinas-para-grupos-especiais">Vacinas para Grupos Especiais</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/vacinacao-para-os-viajantes">Vacinação para os Viajantes</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/rede-de-frio">Rede de Frio</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/informes">Informes</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/notas-tecnicas-e-informativas">Notas Técnicas e Informativas</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/manuais">Manuais</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/legislacao">Legislação</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/publicacoes">Publicações</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/calendario-de-vacinacao">Calendário de Vacinação</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/distribuicao-de-imunobiologicos">Distribuição de Imunobiológicos</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/assuntos/perguntas-frequentes-faq">Perguntas Frequentes (FAQ)</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">VACINAÇÃO</h4>
              <ul>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/organograma">Organograma</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/quem-e-quem">Quem é Quem</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/ministro">Ministro</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/secretaria-executiva">Secretaria Executiva</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/consultoria-juridica">Consultoria Jurídica</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/denasus">DenaSUS</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/saes">Atenção Especializada à Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/saps">Atenção Primária</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/sectics">Ciência e Tecnologia em Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/svsa">Vigilância em Saúde e Ambiente</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/sgtes">Trabalho e Educação na Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/sesai">Saúde Indígena</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/seidigi">Informação e Saúde Digital</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/corregedoria">Corregedoria</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/orgaos-colegiados">Órgãos Colegiados</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/composicao/entidades-vinculadas">Entidades Vinculadas</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">COMPOSIÇÃO</h4>
              <ul>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/institucional">Institucional</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/acoes-e-programas">Ações e Programas</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/agenda-de-autoridades">Agenda de Autoridades</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/auditorias">Auditorias</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/banco-de-precos">Banco de Preços</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/concursos-e-selecoes">Concursos e Seleções</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/convenios-e-transferencias">Convênios e Transferências</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/corregedoria">Corregedoria</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/dados-abertos">Dados Abertos</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/estagio">Estágio</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/gestao-do-sus">Gestão do SUS</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/governanca-publica">Governança Pública</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/informacoes-classificadas">Informações Classificadas</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/lgpd">Lei Geral de Proteção de Dados Pessoais (LGPD)</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/licitacoes-e-contratos">Licitações e Contratos</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/participacao-social">Participação Social</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/perguntas-frequentes">Perguntas Frequentes (FAQ)</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/receitas-e-despesas">Receitas e Despesas</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/sic">Serviço de Informação ao Cidadão (SIC)</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/servidores">Servidores</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/sei">SEI</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/acesso-a-informacao/transparencia-e-prestacao-de-contas">Transparência e prestação de contas</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">ACESSO À INFORMAÇÃO</h4>
              <ul>
                <li><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/audios">Áudios</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/apresentacoes">Apresentações</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/imagens">Imagens</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/manual-de-marcas-do-ministerio-da-saude">Manual de Marcas do Ministério da Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes-ms">Publicações MS</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/uso-da-marca-do-ministerio-da-saude">Uso da Marca do Ministério da Saúde</a></li>
                <li><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/videos">Vídeos</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">CENTRAIS DE CONTEÚDO</h4>
              <div className="footer-sub-section">
                <h4 className="footer-col-title">CANAIS DE ATENDIMENTO</h4>
                <ul>
                  <li><a href="https://www.gov.br/saude/pt-br/canais-de-atendimento/ouvidoria-geral-do-sus">Ouvidoria-Geral do SUS</a></li>
                  <li><a href="https://www.gov.br/saude/pt-br/canais-de-atendimento/sala-de-imprensa">Sala de Imprensa</a></li>
                  <li><a href="https://www.gov.br/saude/pt-br/canais-de-atendimento/ouvsus-136">OuvSUS 136</a></li>
                </ul>
              </div>
              <div className="footer-sub-section" style={{marginTop: '32px'}}>
                <h4 className="footer-col-title">CAMPANHAS DA SAÚDE</h4>
                <ul>
                  <li><a href="https://www.gov.br/saude/pt-br/campanhas-da-saude/2026">2026</a></li>
                  <li><a href="https://www.gov.br/saude/pt-br/campanhas-da-saude/2025">2025</a></li>
                  <li><a href="https://www.gov.br/saude/pt-br/campanhas-da-saude/2024">2024</a></li>
                  <li><a href="https://www.gov.br/saude/pt-br/campanhas-da-saude/2023">2023</a></li>
                  <li><a href="https://www.gov.br/saude/pt-br/campanhas-da-saude/2022">2022</a></li>
                  <li><a href="https://www.gov.br/saude/pt-br/campanhas-da-saude/2021">2021</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="gov-portal-footer-social-row">
            <div className="footer-social-col">
              <h4 className="footer-col-title">REDES SOCIAIS</h4>
              <div className="footer-social-icons">
                <a href="#"><i className="fa-brands fa-youtube"></i></a>
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-soundcloud"></i></a>
                <a href="#"><i className="fa-brands fa-flickr"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-tiktok"></i></a>
              </div>
            </div>
            <div className="footer-info-col">
              <a href="https://www.gov.br/acessoainformacao/pt-br" target="_blank" rel="noreferrer">
                <img src="https://www.gov.br/saude/pt-br/++theme++padrao_govbr/img/acesso-a-informacao.png" alt="Acesso à Informação" className="footer-info-logo" />
              </a>
            </div>
          </div>

          <div className="gov-portal-footer-legal">
            <p>Todo o conteúdo deste site está publicado sob a licença <strong>Creative Commons Atribuição-SemDerivações 3.0 Não Adaptada.</strong></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
