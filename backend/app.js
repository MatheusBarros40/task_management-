const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

// Sincroniza o banco de dados e inicia o servidor
const port = process.env.PORT || 3005;
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
