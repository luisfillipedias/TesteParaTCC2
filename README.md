# 🏥 RegulaSUS

> **Simulador de Alta Fidelidade do Sistema Integrado de Regulação do SUS**

O **RegulaSUS** é uma plataforma desenvolvida para modernizar, simplificar e dar transparência às filas de regulação do Sistema Único de Saúde (SUS). O projeto foca na experiência do usuário, seguindo rigorosamente os padrões visuais e de acessibilidade do portal **Gov.br**, garantindo uma interface familiar e confiável para o cidadão e para o profissional de saúde.

---

## ✨ Principais Funcionalidades

- 🏛️ **Fidelidade Visual Gov.br**: Interface baseada no Design System oficial do governo federal.
- 🌓 **Acessibilidade de Alto Nível**: Modo de alto contraste integrado e persistente.
- 🛡️ **Autenticação Segura**: Fluxo de login simulado via Single Sign-On (SSO) Gov.br.
- 📊 **Gestão Multi-Perfil**: Dashboards específicos para Pacientes, Médicos, Gestores e Administradores.
- 📝 **Validação de Dados**: Máscaras inteligentes e validações estritas para CPF, CNS, Telefone e Datas.
- 🕵️ **Auditoria**: Log detalhado de todas as ações críticas realizadas no sistema.

---

## 👥 Equipe do Projeto

### Alunos Integrantes
- **Alice Soares Rosa Vasconcelhos**
- **Guilherme Yuri Timoteo Placido**
- **Leandro Mateus Mendes**
- **Luis Fillipe Dias De Oliveira**
- **Pedro Vidal Silva**
- **Tulio Araujo Grossi**

### Orientadores
- **Prof. Edson**
- **Prof. Danilo**

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (Hospedado no [Neon](https://neon.tech))
- **Estilização**: Vanilla CSS (Custom Design System)
- **Autenticação**: JWT (JSON Web Tokens)
- **Deployment**: [Vercel](https://vercel.com)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v16 ou superior)
- [NPM](https://www.npmjs.com/)

### Instalação Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/luisfillipedias/TesteParaTCC2.git
   cd TesteParaTCC2
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL=sua_url_do_postgres_aqui
   JWT_SECRET=sua_chave_secreta_jwt
   ```

4. **Inicie o Ambiente de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   O frontend estará em `http://localhost:5173` e a API em `http://localhost:3001`.

---

## 🔑 Contas para Teste (Seed)

Para facilitar a avaliação, o sistema já vem populado com as seguintes contas padrão:

| Perfil | CPF | Senha |
| :--- | :--- | :--- |
| **Administrador** | `11122233344` | `Adm@2026!` |
| **Médico** | `12345678900` | `Med@2026!` |
| **Paciente** | `98765432101` | `Pac@2026!` |
| **Gestor** | `45678901234` | `Ges@2026!` |

---

## 📁 Estrutura do Repositório

- `/src`: Código fonte do frontend React.
- `/api`: Servidor backend Node.js (Serverless Functions).
- `/documentos`: Atas, termos e registros oficiais.
- `/divulgacao`: Vídeos, apresentações e materiais promocionais.

---

## 📄 Licença

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC). Todos os direitos reservados aos autores.

---
*Este repositório contém a versão final polida para entrega oficial.*
