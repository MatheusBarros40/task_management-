'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tasks = [];

    for (let i = 30; i <= 20; i++) {
      tasks.push({
        title: `Tarefa Teste ${i}`,
        description: `Descrição da tarefa teste ${i}`,
        status: 'Pendente',
        createdAt: new Date()
      });
    }

    return queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
