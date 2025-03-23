const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./models/index');
const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const taskTypeDefs = require('./graphql/schema/taskSchema');
const taskResolvers = require('./graphql/resolver/taskResolver');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs: taskTypeDefs,
    resolvers: taskResolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { req, token };
    }
  });

  await server.start();
  server.applyMiddleware({ 
    app, 
    path: '/graphql', 
    cors: { 
      origin: 'http://localhost:3000', 
      credentials: true 
    } 
  });

  const port = process.env.PORT || 3005;
  sequelize.authenticate()
    .then(() => {
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
        console.log(`GraphQL endpoint disponível em http://localhost:${port}${server.graphqlPath}`);
      });
    })
    .catch(err => {
      console.error('Erro ao conectar com o banco de dados:', err);
    });
}

startApolloServer();
