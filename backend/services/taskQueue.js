const { createChannel } = require('../config/rabbitmq');

async function publishCleanupMessage(taskId) {
  try {
    const channel = await createChannel();
    channel.sendToQueue('taskCleanupQueue', Buffer.from(JSON.stringify({ taskId })), { persistent: true });
    console.log(`📤 Mensagem enviada para a fila: Tarefa ${taskId} marcada para exclusão.`);
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem para a fila:', error);
  }
}

module.exports = publishCleanupMessage;
