const faqs = [
  { q: 'Como acompanho minha solicitação?', a: 'Acesse "Minhas Solicitações" no menu lateral. Lá você verá todas as suas solicitações com o status atual, prioridade e posição na fila. Clique em "Ver" para detalhes completos com o progresso passo a passo.' },
  { q: 'Como cancelo uma solicitação?', a: 'Na lista de solicitações, clique em "Cancelar" ao lado da solicitação desejada. Você precisará informar o motivo do cancelamento. Atenção: ao cancelar, sua posição na fila será perdida.' },
  { q: 'Como encontro uma unidade de saúde?', a: 'Acesse "Locais de Atendimento" no menu. Você pode filtrar por tipo (Hospital, UBS, UPA, etc.) e buscar por especialidade ou nome da unidade.' },
  { q: 'O que significam as prioridades?', a: 'Alta — Urgência médica, atendimento prioritário. Média — Necessário, mas sem risco imediato. Baixa — Procedimento eletivo.' },
  { q: 'Preciso de mais ajuda. Como entro em contato?', a: 'Ligue para a Central de Atendimento: (31) 3333-0000 (seg a sex, 8h às 18h) ou envie um e-mail para suporte@regulasus.gov.br.' },
];

export default function PacienteAjuda() {
  return (
    <>
      <h1 className="page-title">Central de Ajuda</h1>
      <p className="page-subtitle">Tire suas dúvidas sobre o RegulaSUS.</p>
      <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}}>
        {faqs.map((f, i) => (
          <div className={`card animate-fade-in-up${i > 0 ? ` delay-${i}` : ''}`} key={i}>
            <div className="card-body">
              <h3 style={{fontSize:'var(--text-md)',marginBottom:'var(--space-3)',display:'flex',alignItems:'center',gap:'var(--space-2)'}}><i className="fa-solid fa-circle-question" style={{color:'var(--clr-primary)'}}></i> {f.q}</h3>
              <p style={{fontSize:'var(--text-sm)',color:'var(--clr-text-secondary)',lineHeight:'var(--leading-relaxed)'}}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
