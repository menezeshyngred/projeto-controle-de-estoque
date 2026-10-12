# EstoquePro (Sistema de Controle de Estoque)

Projeto Integrador — Faculdade GRAN

Projeto acadêmico desenvolvido para a disciplina **Projeto Integrador** da Faculdade GRAN, com o objetivo de desenvolver uma aplicação web para o gerenciamento de produtos e fornecedores.

## Sobre o Projeto

O **EstoquePro** é um sistema web de controle de estoque que permite cadastrar, consultar, editar e excluir produtos e fornecedores, além de gerenciar as associações entre eles.

A aplicação foi desenvolvida com React no frontend, Node.js e Express no backend e SQLite para armazenamento dos dados.

## Objetivos

- Desenvolver uma aplicação web para gerenciamento de produtos e fornecedores.
- Implementar operações CRUD (criar, consultar, atualizar e excluir).
- Integrar o frontend ao backend por meio de requisições HTTP.
- Armazenar e consultar dados utilizando um banco de dados SQLite.
- Implementar um relacionamento muitos para muitos entre produtos e fornecedores.

## Funcionalidades

### Produtos
- Cadastrar produtos.
- Listar produtos cadastrados.
- Editar informações dos produtos.
- Excluir produtos.

### Fornecedores
- Cadastrar fornecedores.
- Listar fornecedores cadastrados.
- Pesquisar fornecedores por nome ou CNPJ.
- Editar informações dos fornecedores.
- Excluir fornecedores.

### Associação entre produtos e fornecedores
- Associar produtos a fornecedores.
- Consultar os fornecedores associados a um produto.
- Consultar os produtos associados a um fornecedor.
- Desassociar produtos e fornecedores.

## Tecnologias Utilizadas

### Frontend
- React
- JavaScript
- HTML
- CSS
- Lucide React

### Backend
- Node.js
- Express
- JavaScript
- SQLite
- better-sqlite3

### Ferramentas
- Visual Studio Code
- Insomnia
- npm

## Estrutura do Projeto

```text
EstoquePro/
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── associacoes.js
│   │   │   ├── fornecedores.js
│   │   │   └── produtos.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
├── package.json
├── package-lock.json
└── README.md
```

## Pré-requisitos

Para executar o projeto, é necessário ter instalado:

- [Node.js e npm](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/) (opcional, mas recomendado)

## Como Executar o Projeto

O frontend e o backend são executados em terminais separados.

### 1. Clonar o repositório

```bash
git clone https://github.com/menezeshyngred/projeto-controle-de-estoque.git
```

Entre na pasta do projeto:

```bash
cd EstoquePro
```

### 2. Executar o backend

Abra um terminal e execute:

```bash
cd backend
npm install
npm start
```

O backend será iniciado na porta **3000**:

```text
http://localhost:3000
```

### 3. Executar o frontend

Abra um **segundo terminal** na pasta principal do projeto e execute:

```bash
cd frontend
npm install
npm start
```

O frontend será iniciado na porta **3001**:

```text
http://localhost:3001
```

Mantenha os dois terminais abertos enquanto utiliza o sistema.

## Banco de Dados

O projeto utiliza o SQLite para armazenar as informações.

O banco de dados possui três tabelas principais:

- **produtos:** armazena os dados dos produtos, como nome, descrição, preço e código de barras.
- **fornecedores:** armazena os dados dos fornecedores, como nome, CNPJ, endereço e contato.
- **produto_fornecedor:** registra as associações entre produtos e fornecedores.

O relacionamento entre produtos e fornecedores é do tipo **muitos para muitos (N:N)**. Isso significa que um produto pode estar associado a vários fornecedores e um fornecedor pode fornecer vários produtos.

## Testes

As requisições do backend foram testadas utilizando o Insomnia.

Foram verificadas as funcionalidades de cadastro, consulta, atualização e exclusão de produtos e fornecedores, além das operações de associação e consulta entre eles.

## Instituição

**Faculdade GRAN**

Site institucional: https://faculdade.grancursosonline.com.br/

Disciplina: Projeto Integrador.

## Licença

Projeto desenvolvido para fins acadêmicos e educacionais.
