// ============================================
// RegulaSUS — Mock Data
// ============================================

const MOCK = {
  // Current user profiles
  users: {
    medico: { name: 'Dr. Carlos Andrade', role: 'Médico', crm: 'CRM-MG 12345', initials: 'CA' },
    paciente: { name: 'Maria Silva', role: 'Paciente', cpf: '***.***.***-01', initials: 'MS' },
    gestor: { name: 'Roberto Mendes', role: 'Gestor Municipal', initials: 'RM' },
    admin: { name: 'Admin Sistema', role: 'Administrador', initials: 'AS' }
  },

  // Solicitações
  solicitacoes: [
    { id: '#1204', paciente: 'Maria da Silva', procedimento: 'Consulta Cardiologia', prioridade: 'Alta', status: 'Aguardando', data: '02/05/2026', medico: 'Dr. Carlos Andrade' },
    { id: '#1198', paciente: 'João Pereira', procedimento: 'Cirurgia Ortopédica', prioridade: 'Média', status: 'Aprovado', data: '29/04/2026', medico: 'Dra. Ana Costa' },
    { id: '#1193', paciente: 'Ana Souza', procedimento: 'Ressonância Magnética', prioridade: 'Baixa', status: 'Aguardando', data: '28/04/2026', medico: 'Dr. Carlos Andrade' },
    { id: '#1187', paciente: 'Carlos Lima', procedimento: 'Consulta Neurologia', prioridade: 'Alta', status: 'Aprovado', data: '25/04/2026', medico: 'Dr. Paulo Reis' },
    { id: '#1175', paciente: 'Beatriz Melo', procedimento: 'Exame Laboratorial', prioridade: 'Baixa', status: 'Cancelado', data: '20/04/2026', medico: 'Dra. Ana Costa' },
    { id: '#1162', paciente: 'Rodrigo Alves', procedimento: 'Consulta Pneumologia', prioridade: 'Média', status: 'Aprovado', data: '15/04/2026', medico: 'Dr. Carlos Andrade' },
    { id: '#1155', paciente: 'Fernanda Oliveira', procedimento: 'Tomografia', prioridade: 'Alta', status: 'Em Andamento', data: '12/04/2026', medico: 'Dr. Paulo Reis' },
    { id: '#1148', paciente: 'Lucas Santos', procedimento: 'Consulta Dermatologia', prioridade: 'Baixa', status: 'Concluído', data: '10/04/2026', medico: 'Dra. Ana Costa' }
  ],

  // Transportes
  transportes: [
    { id: 'T-0451', paciente: 'Maria da Silva', origem: 'UBS Centro', destino: 'Hospital Regional', data: '03/05/2026', horario: '08:00', status: 'Confirmado', tipo: 'Ambulância' },
    { id: 'T-0449', paciente: 'José Almeida', origem: 'UPA Norte', destino: 'Hospital Estadual', data: '03/05/2026', horario: '10:30', status: 'Pendente', tipo: 'Van' },
    { id: 'T-0445', paciente: 'Ana Souza', origem: 'PSF Vila Nova', destino: 'Clínica São Lucas', data: '02/05/2026', horario: '14:00', status: 'Em Rota', tipo: 'Ambulância' },
    { id: 'T-0440', paciente: 'Pedro Costa', origem: 'UBS Leste', destino: 'Hospital Regional', data: '01/05/2026', horario: '07:30', status: 'Concluído', tipo: 'Van' },
    { id: 'T-0435', paciente: 'Lucia Ferreira', origem: 'UPA Sul', destino: 'Hospital Estadual', data: '30/04/2026', horario: '16:00', status: 'Cancelado', tipo: 'Ambulância' }
  ],

  // Notificações
  notificacoes: [
    { id: 1, title: 'Solicitação aprovada', desc: 'Sua consulta em Cardiologia foi aprovada para 10/05/2026.', time: '2 horas atrás', type: 'success', read: false },
    { id: 2, title: 'Transporte confirmado', desc: 'Transporte ambulatorial agendado para 03/05/2026 às 08:00.', time: '5 horas atrás', type: 'info', read: false },
    { id: 3, title: 'Posição na fila atualizada', desc: 'Você avançou para a posição #3 na fila de Cirurgia Ortopédica.', time: '1 dia atrás', type: 'warning', read: true },
    { id: 4, title: 'Documentos pendentes', desc: 'Envie os exames complementares para dar andamento à solicitação.', time: '2 dias atrás', type: 'danger', read: true },
    { id: 5, title: 'Nova unidade disponível', desc: 'Hospital São Lucas agora aceita consultas em Neurologia pelo SUS.', time: '3 dias atrás', type: 'info', read: true }
  ],

  // Locais de atendimento
  locais: [
    { nome: 'Hospital Regional de Belo Horizonte', endereco: 'Av. Brasil, 1500 - Centro', tel: '(31) 3333-1000', especialidades: ['Cardiologia', 'Ortopedia', 'Neurologia'], tipo: 'Hospital' },
    { nome: 'UBS Centro Saúde', endereco: 'Rua Goiás, 800 - Centro', tel: '(31) 3333-2000', especialidades: ['Clínica Geral', 'Pediatria'], tipo: 'UBS' },
    { nome: 'UPA Norte', endereco: 'Av. Cristiano Machado, 2200', tel: '(31) 3333-3000', especialidades: ['Urgência', 'Emergência'], tipo: 'UPA' },
    { nome: 'Clínica São Lucas', endereco: 'Rua Sergipe, 450 - Funcionários', tel: '(31) 3333-4000', especialidades: ['Dermatologia', 'Oftalmologia', 'Pneumologia'], tipo: 'Clínica' },
    { nome: 'Hospital Estadual', endereco: 'Av. Amazonas, 3100 - Gameleira', tel: '(31) 3333-5000', especialidades: ['Cirurgia', 'Oncologia', 'Cardiologia'], tipo: 'Hospital' },
    { nome: 'PSF Vila Nova', endereco: 'Rua das Flores, 120 - Vila Nova', tel: '(31) 3333-6000', especialidades: ['Saúde da Família', 'Vacinação'], tipo: 'PSF' }
  ],

  // Usuários (admin)
  usuarios: [
    { id: 1, nome: 'Dr. Carlos Andrade', email: 'carlos@sus.gov.br', perfil: 'Médico', status: 'Ativo', criado: '15/01/2026' },
    { id: 2, nome: 'Maria da Silva', email: 'maria@email.com', perfil: 'Paciente', status: 'Ativo', criado: '20/02/2026' },
    { id: 3, nome: 'Roberto Mendes', email: 'roberto@saude.mg.gov.br', perfil: 'Gestor Municipal', status: 'Ativo', criado: '10/01/2026' },
    { id: 4, nome: 'Dra. Ana Costa', email: 'ana.costa@sus.gov.br', perfil: 'Médico', status: 'Ativo', criado: '05/03/2026' },
    { id: 5, nome: 'João Pereira', email: 'joao@email.com', perfil: 'Paciente', status: 'Inativo', criado: '12/02/2026' },
    { id: 6, nome: 'Claudia Reis', email: 'claudia@saude.mg.gov.br', perfil: 'Secretária', status: 'Ativo', criado: '01/04/2026' }
  ],

  // Stats
  stats: {
    paciente: { solicitacoes: 3, aprovadas: 1, posicaoFila: 5, proximaConsulta: '10/05/2026' },
    medico: { solicitacoesMes: 24, aprovadas: 18, pendentes: 4, taxa: '75%' },
    gestor: { totalFila: 156, atendidosMes: 89, tempoMedio: '12 dias', transportesMes: 45 },
    admin: { usuarios: 342, ativos: 298, novosMes: 15, medicos: 48 }
  }
};
