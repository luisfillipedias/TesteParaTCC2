import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const nav = document.getElementById('landingNav');
    const handleScroll = () => {
      if (window.scrollY > 50) nav?.classList.add('scrolled');
      else nav?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* NAVIGATION */}
      <nav className="landing-nav" id="landingNav">
        <div className="nav-brand">
          <i className="fa-solid fa-heart-pulse"></i>
          <span>Regula<span style={{fontWeight:400,opacity:.7}}>SUS</span></span>
        </div>
        <div className="nav-links hide-mobile">
          <a href="#features">Funcionalidades</a>
          <a href="#actors">Perfis</a>
          <a href="#about">Sobre</a>
          <a href="#contact">Contato</a>
          <button className="nav-cta" onClick={() => navigate('/login')}>
            <i className="fa-solid fa-right-to-bracket"></i> Acessar Sistema
          </button>
        </div>
        <button className="mobile-menu-btn" onClick={(e) => e.currentTarget.previousElementSibling?.classList.toggle('hide-mobile')}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text animate-fade-in-up">
            <div className="hero-badge">
              <span className="dot"></span> Sistema Oficial SUS — v1.0.1
            </div>
            <h1>Regulação <span className="highlight">inteligente</span> para a saúde pública</h1>
            <p className="hero-desc">Gerencie procedimentos eletivos, transporte ambulatorial e filas de espera de forma integrada, transparente e eficiente.</p>
            <div className="hero-actions">
              <button className="hero-btn hero-btn-primary" onClick={() => navigate('/login')}>
                <i className="fa-solid fa-arrow-right"></i> Acessar o Sistema
              </button>
              <button className="hero-btn hero-btn-outline" onClick={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})}>
                <i className="fa-solid fa-play"></i> Saiba Mais
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="stat-num">2.000+</div><div className="stat-txt">Usuários Simultâneos</div></div>
              <div className="hero-stat"><div className="stat-num">&lt;4s</div><div className="stat-txt">Tempo de Resposta</div></div>
              <div className="hero-stat"><div className="stat-num">24/7</div><div className="stat-txt">Disponibilidade</div></div>
            </div>
          </div>
          <div className="hero-visual animate-fade-in-up delay-2">
            <div className="hero-card">
              <div className="card-header-row">
                <div className="hc-icon"><i className="fa-solid fa-chart-line"></i></div>
                <div><div className="hc-title">Painel de Regulação</div><div className="hc-sub">Dados em tempo real</div></div>
              </div>
              <div className="mini-cards">
                <div className="mini-card"><i className="fa-solid fa-clipboard-list"></i><div className="mc-val">156</div><div className="mc-label">Na Fila</div></div>
                <div className="mini-card"><i className="fa-solid fa-check-circle"></i><div className="mc-val">89</div><div className="mc-label">Atendidos/Mês</div></div>
                <div className="mini-card"><i className="fa-solid fa-ambulance"></i><div className="mc-val">45</div><div className="mc-label">Transportes</div></div>
                <div className="mini-card"><i className="fa-solid fa-user-doctor"></i><div className="mc-val">48</div><div className="mc-label">Médicos</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-header">
          <div className="section-tag"><i className="fa-solid fa-sparkles"></i> Funcionalidades</div>
          <h2 className="section-title">Tudo que você precisa em um só lugar</h2>
          <p className="section-desc">O RegulaSUS oferece uma plataforma completa para regulação de procedimentos, transporte e monitoramento de indicadores de saúde.</p>
        </div>
        <div className="features-grid">
          {[
            { gradient: 'linear-gradient(135deg,#0D6B3F,#10B981)', bg: 'var(--clr-primary-light)', color: 'var(--clr-primary)', icon: 'fa-clipboard-check', title: 'Gestão de Procedimentos', desc: 'Solicite, acompanhe e gerencie procedimentos eletivos com priorização automática e rastreamento em tempo real.' },
            { gradient: 'linear-gradient(135deg,#1A73B5,#3B82F6)', bg: 'var(--clr-secondary-light)', color: 'var(--clr-secondary)', icon: 'fa-ambulance', title: 'Transporte Ambulatorial', desc: 'Agendamento inteligente de transporte com rastreamento de rotas, priorização e gestão de frota.' },
            { gradient: 'linear-gradient(135deg,#FF6B35,#F59E0B)', bg: 'var(--clr-accent-light)', color: 'var(--clr-accent)', icon: 'fa-chart-pie', title: 'Indicadores de Saúde', desc: 'Dashboards com métricas de desempenho, tempo médio de espera e indicadores regionais.' },
            { gradient: 'linear-gradient(135deg,#8B5CF6,#A78BFA)', bg: '#EDE9FE', color: '#7C3AED', icon: 'fa-bell', title: 'Notificações em Tempo Real', desc: 'Alertas automáticos sobre status de solicitações, posição na fila e agendamentos confirmados.' },
            { gradient: 'linear-gradient(135deg,#EC4899,#F472B6)', bg: '#FCE7F3', color: '#DB2777', icon: 'fa-map-location-dot', title: 'Locais de Atendimento', desc: 'Busca de unidades de saúde por especialidade e localização com informações de convênios e horários.' },
            { gradient: 'linear-gradient(135deg,#14B8A6,#2DD4BF)', bg: '#CCFBF1', color: '#0D9488', icon: 'fa-shield-halved', title: 'Segurança & Compliance', desc: 'Criptografia HTTPS/TLS, autenticação segura e conformidade com LGPD para proteção dos dados.' },
          ].map((f, i) => (
            <div className="feature-card" key={i} style={{'--card-gradient': f.gradient}}>
              <div className="fc-icon" style={{background: f.bg, color: f.color}}><i className={`fa-solid ${f.icon}`}></i></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACTORS */}
      <section className="section" id="actors" style={{background:'var(--clr-bg-alt)',maxWidth:'100%',paddingLeft:0,paddingRight:0}}>
        <div style={{maxWidth:'var(--max-content-width)',margin:'0 auto',padding:'0 var(--space-8)'}}>
          <div className="section-header">
            <div className="section-tag"><i className="fa-solid fa-users"></i> Perfis de Acesso</div>
            <h2 className="section-title">Para cada ator, uma experiência dedicada</h2>
            <p className="section-desc">O sistema se adapta ao perfil de cada usuário, oferecendo as ferramentas certas para cada função.</p>
          </div>
          <div className="actors-grid">
            {[
              { bg: 'var(--clr-primary-light)', color: 'var(--clr-primary)', icon: 'fa-user', title: 'Paciente', desc: 'Acompanhe suas solicitações e posição na fila', features: ['Consultar status da solicitação','Visualizar notificações','Solicitar cancelamento','Consultar locais de atendimento'] },
              { bg: 'var(--clr-secondary-light)', color: 'var(--clr-secondary)', icon: 'fa-user-doctor', title: 'Médico', desc: 'Solicite procedimentos e consulte prontuários', features: ['Solicitar procedimento','Solicitar transporte ambulatorial','Definir prioridade','Consultar histórico do paciente'] },
              { bg: 'var(--clr-accent-light)', color: 'var(--clr-accent)', icon: 'fa-chart-bar', title: 'Gestor', desc: 'Gerencie filas, transportes e indicadores', features: ['Gerenciar fila de procedimentos','Registrar transporte','Monitorar indicadores','Cadastrar solicitações'] },
            ].map((a, i) => (
              <div className="actor-card" key={i}>
                <div className="actor-icon" style={{background:a.bg,color:a.color}}><i className={`fa-solid ${a.icon}`}></i></div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <ul className="actor-features">
                  {a.features.map((f, j) => <li key={j}><i className="fa-solid fa-check"></i> {f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="section-header">
          <div className="section-tag"><i className="fa-solid fa-info-circle"></i> Sobre</div>
          <h2 className="section-title">Transformando a regulação do SUS</h2>
          <p className="section-desc">O RegulaSUS é uma solução web desenvolvida para modernizar e agilizar a gestão de demandas de procedimentos eletivos e transporte ambulatorial no Sistema Único de Saúde.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Pronto para começar?</h2>
        <p>Acesse o sistema e experimente uma nova forma de regular a saúde pública.</p>
        <button className="hero-btn hero-btn-primary" onClick={() => navigate('/login')} style={{margin:'0 auto'}}>
          <i className="fa-solid fa-arrow-right"></i> Acessar Agora
        </button>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div>
            <div className="footer-brand">Regula<span>SUS</span></div>
            <p className="footer-desc">Sistema integrado de regulação do SUS para gestão de procedimentos eletivos e transporte ambulatorial.</p>
          </div>
          <div className="footer-col">
            <h4>Sistema</h4>
            <a href="#features">Funcionalidades</a>
            <a href="#actors">Perfis</a>
            <a href="#about">Sobre</a>
          </div>
          <div className="footer-col">
            <h4>Suporte</h4>
            <a href="#">Documentação</a>
            <a href="#">FAQ</a>
            <a href="#">Contato</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade (LGPD)</a>
            <a href="#">Acessibilidade</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 RegulaSUS — Ministério da Saúde. Todos os direitos reservados.</span>
          <span>v1.0.1</span>
        </div>
      </footer>
    </>
  );
}
