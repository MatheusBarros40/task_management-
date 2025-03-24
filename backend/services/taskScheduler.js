const cron = require('node-cron');
const { Op } = require('sequelize');
const Task = require('../models/task');
const publishCleanupMessage = require('./taskQueue');

async function cleanupOldTasks() {
  try {
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    
    const oldTasks = await Task.findAll({
      where: { 
        createdAt: { [Op.lt]: fiveDaysAgo },
        status: 'Pendente' 
      }
    });

    oldTasks.forEach(task => {
      publishCleanupMessage(task.id);
      console.log(`⏳ Tarefa ${task.id} (criada em ${task.createdAt}) marcada para exclusão`);
    });

    return oldTasks.length;
  } catch (error) {
    console.error('❌ Erro no agendador:', error);
    return 0;
  }
}

cron.schedule('10 18 * * *', async () => {
  console.log('🕒 Iniciando limpeza automática de tarefas...');
  const deletedCount = await cleanupOldTasks();
  console.log(`✅ ${deletedCount} tarefas antigas enviadas para exclusão`);
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

module.exports = cleanupOldTasks;