import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', { 
  transports: ['websocket']
});

socket.on('task_deleted', (data) => {
  console.log('🔥 Tarefa excluída automaticamente:', data);
  alert(`A tarefa ${data.taskId} foi excluída automaticamente!`);
});

export default socket;
