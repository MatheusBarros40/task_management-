const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';

let connection = null;
let channel = null;

async function createChannel() {
  if (!connection) {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('taskCleanupQueue', { durable: true });
  }
  return channel;
}

module.exports = { createChannel, RABBITMQ_URL };