const amqp = require('amqplib');
const Task = require('../models/task'); 
const { getIO } = require('../config/socket');
const { RABBITMQ_URL } = require('../config/rabbitmq');
const createChannel = require('../config/rabbitmq');

async function startWorker() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'taskCleanupQueue';

    await channel.assertQueue(queue, { durable: true });
    console.log('🚀 Worker de limpeza de tarefas iniciado. Aguardando mensagens na fila:', queue);


    channel.consume(queue, async (msg) => { 
      if (msg) {
        try {
          const { taskId } = JSON.parse(msg.content.toString());
          await Task.destroy({ where: { id: taskId } });
          console.log(`🗑️ Tarefa ${taskId} excluída automaticamente.`);
          
          getIO().emit('task_deleted', { taskId }); 
          channel.ack(msg);
        } catch (error) {
          console.error('❌ Erro ao processar mensagem:', error);
          channel.nack(msg); 
        }
      }
    });
  } catch (error) {
    console.error('❌ Erro no worker:', error);
    setTimeout(startWorker, 5000);
  }
}

startWorker();
