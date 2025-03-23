const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    status: String
    createdAt: String
  }

  type TasksPage {
    tasks: [Task!]!
    total: Int!
    page: Int!
    perPage: Int!
  }

  type Query {
    # Retorna as tarefas com paginação (5 itens por página) e ordenadas por createdAt DESC
    tasks(page: Int!): TasksPage!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String): Task!
    updateTask(id: ID!, title: String, description: String, status: String): Task!
    deleteTask(id: ID!): Boolean!
    markTaskComplete(id: ID!): Task!
  }
`;

module.exports = typeDefs;
