# RegulaSUS

O Objetivo do projeto é que as filas estaduais e municipais do SUS sejam mais simples e transparentes para o usuario.

## Alunos integrantes da equipe

-  Alice Soares Rosa Vasconcelhos
-  Guilherme Yuri Timoteo Placido
-  Leandro Mateus Mendes
-  Luis Fillipe Dias De Oliveira
-  Pedro Vidal Silva
-  Tulio Araujo Grossi

## Professores responsaveis

- Edson
- Danilo

## Instruções de utilização

Para rodar o projeto localmente:

1.  **Clone o repositório** e entre na pasta do projeto.
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Configuração do Banco de Dados**:
    Crie um arquivo `.env` na raiz com a sua URL do banco PostgreSQL (ex: Neon):
    ```env
    DATABASE_URL=sua_url_aqui
    JWT_SECRET=uma_chave_segura
    ```
4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
    O sistema estará disponível em `http://localhost:5173`.

## Estrutura complementar do repositorio

- `documentos/`: atas, termos e documentos para registros (ex.: registro de software).
- `divulgacao/`: materiais de divulgacao do projeto (videos, apresentacoes, banners etc.).

## Observação importante

Este repositório contém a versão final e polida do sistema RegulaSUS para a entrega do TCC.
