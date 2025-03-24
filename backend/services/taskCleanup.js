const { Op } = require('sequelize');
const publishCleanupMessage = require('./taskQueue');

async function cleanupOldTasks() {
  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
  const oldTasks = await Task.findAll({
    where: { createdAt: { [Op.lt]: fiveDaysAgo } }
  });
  
  oldTasks.forEach(task => publishCleanupMessage(task.id));
  return oldTasks;
}

module.exports = cleanupOldTasks;