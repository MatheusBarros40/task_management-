'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password1 = bcrypt.hashSync('123456', 10);
    const password2 = bcrypt.hashSync('abcdef', 10);

    return queryInterface.bulkInsert('users', [
      {
        name: 'Usuário Teste 1',
        email: 'teste1@example.com',
        password: password1,
        createdAt: new Date()
      },
      {
        name: 'Usuário Teste 2',
        email: 'teste2@example.com',
        password: password2,
        createdAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
