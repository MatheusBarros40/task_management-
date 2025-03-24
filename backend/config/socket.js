const socketIo = require('socket.io');

let io = null;

module.exports = {
  init: (httpServer) => {
    io = socketIo(httpServer, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error('Socket.io não inicializado!');
    return io;
  }
};