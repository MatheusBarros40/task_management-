const Task = require('../../models/task');

const resolvers = {
  Query: {
    tasks: async (_, { page }) => {
      const perPage = 5;
      const offset = (page - 1) * perPage;
      const { count, rows } = await Task.findAndCountAll({
        limit: perPage,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });
      return {
        tasks: rows,
        total: count,
        page: page,
        perPage: perPage,
      };
    },
    task: async (_, { id }) => {
      return await Task.findByPk(id);
    }
  },
  Mutation: {
    createTask: async (_, { title, description }) => {
      return await Task.create({ title, description });
    },
    updateTask: async (_, { id, title, description, status }) => {
      const task = await Task.findByPk(id);
      if (!task) throw new Error("Tarefa não encontrada");
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      await task.save();
      return task;
    },
    deleteTask: async (_, { id }) => {
      const task = await Task.findByPk(id);
      if (!task) throw new Error("Tarefa não encontrada");
      await task.destroy();
      return true;
    },
    markTaskComplete: async (_, { id }) => {
      const task = await Task.findByPk(id);
      if (!task) throw new Error("Tarefa não encontrada");
      task.status = 'Concluído';
      await task.save();
      return task;
    }
  }
};

module.exports = resolvers;
