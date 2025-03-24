const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./models/index');
const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const http = require('http');
const socketIo = require('socket.io');
require('./services/taskScheduler');
const taskTypeDefs = require('./graphql/schema/taskSchema');
const taskResolvers = require('./graphql/resolver/taskResolver');

const app = express();
const server = http.createServer(app);
const { init: initSocket } = require('./config/socket');
const io = initSocket(server);


app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.get('/', (req, res) => res.send('API está funcionando!'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});

io.on('connection', (socket) => {
  console.log('🟢 Novo cliente conectado ao WebSocket', socket.id);
});

async function startApolloServer() {
  const apolloServer = new ApolloServer({
    typeDefs: taskTypeDefs,
    resolvers: taskResolvers,
    context: ({ req }) => ({ token: req.headers.authorization || '' })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ 
    app, 
    path: '/graphql',
    cors: { origin: 'http://localhost:3000', credentials: true }
  });
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida');

    await startApolloServer();

    server.listen(4000, () => {
      console.log('🚀 Servidor rodando na porta 4000');
      console.log(`📡 GraphQL: http://localhost:4000/graphql`);
    });
  } catch (err) {
    console.error('❌ Falha na inicialização:', err);
  }
}

startServer();

module.exports = { app };