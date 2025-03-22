const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_db', 'user', 'user', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false, 
});

module.exports = sequelize;
