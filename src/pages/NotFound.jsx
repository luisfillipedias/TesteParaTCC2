import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8)',
      background: '#fff',
      textAlign: 'center',
      fontFamily: 'Rawline, sans-serif'
    }}>
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ 
          fontSize: '120px', 
          fontWeight: 800, 
          color: '#1351b4', 
          margin: 0,
          lineHeight: 1 
        }}>404</h1>
        
        <h2 style={{ 
          fontSize: 'var(--text-3xl)', 
          color: '#333', 
          marginTop: 'var(--space-4)',
          marginBottom: 'var(--space-2)'
        }}>Página não encontrada</h2>
        
        <p style={{ 
          color: '#666', 
          fontSize: 'var(--text-lg)',
          marginBottom: 'var(--space-8)',
          lineHeight: 1.6
        }}>
          O conteúdo que você está procurando não existe ou foi movido. <br />
          Certifique-se de que digitou o endereço corretamente.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: 'var(--space-3) var(--space-8)' }}
            onClick={() => navigate('/')}
          >
            <i className="fa-solid fa-house" style={{ marginRight: '8px' }}></i>
            Página Inicial
          </button>
          
          <button 
            className="btn btn-secondary" 
            style={{ padding: 'var(--space-3) var(--space-8)' }}
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i>
            Voltar
          </button>
        </div>

        <div style={{ marginTop: 'var(--space-12)', borderTop: '1px solid #eee', paddingTop: 'var(--space-8)' }}>
          <img 
            src="https://www.gov.br/++resource++brasil.gov.portal/img/logo-governo-federal.png" 
            alt="Governo Federal" 
            style={{ height: '48px', opacity: 0.6 }}
          />
        </div>
      </div>
    </div>
  );
}
