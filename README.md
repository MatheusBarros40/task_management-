# Task Management

Um projeto de gerenciamento de tarefas com backend em Node.js/Express e frontend em React, utilizando Tailwind CSS para a interface.\
O projeto implementa funcionalidades de CRUD de tarefas e autenticação JWT.

## Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Express
  - Sequelize
  - MySQL
  - GraphQL  
  - RabbitMQ  
  - JWT para autenticação
  - Nodemon (para desenvolvimento)
- **Frontend:**
  - React
  - React Router
  - Tailwind CSS
  - SocketIO
  - Cypress 
  - Axios (para consumo da API)

## Funcionalidades

- **Backend:**
  - CRUD completo de tarefas
  - Autenticação de usuários com JWT
  - Migrations e Seeders com Sequelize
- **Frontend:**
  - SPA com React
  - Interface responsiva com Tailwind CSS
  - Consumo da API via Axios
  - Tela de login, registro, listagem, criação, edição e exclusão de tarefas
  - Filtros de tarefas (pendentes/concluídas)
  - Navbar responsiva

## Estrutura do Projeto

```
task_management/
├── backend/          # Código do backend
│   ├── config/
│   ├── graphql/
    │   ├── resolver/
    │   ├── schema/
│   ├── middlewares/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── services/
│   ├── app.js
│   └── package.json
└── frontend/         # Código do frontend
    ├── cypress/
    │   ├── e2e/
    ├── src/
    │   ├── public/
    │   ├── components/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Como Rodar o Projeto

### Backend

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm i
   ```
3. Execute o servidor (utilizando Nodemon):
   ```bash
   npx nodemon app.js
   ```
4. Execute o Worker Independente (Em outro Terminal):
   ```bash
   node services/taskWorker.js
   ```   
   > Certifique-se de que o banco de dados MySQL está configurado corretamente e as migrations foram executadas.

### Frontend

1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
   > O aplicativo será aberto no seu navegador (geralmente na porta 3000).

## Link do Repositório

[https://github.com/MatheusBarros40/task\_management](https://github.com/MatheusBarros40/task_management)

## Considerações Finais

Este projeto está funcional e atende aos requisitos propostos, porém, há sempre possibilidades de melhorias. Sinta-se à vontade para fazer forks, enviar issues e pull requests para aprimorar ainda mais o projeto.

