import type { Socket } from 'socket.io';

export const registerNotificationEvents = (socket: Socket) => {
  socket.on('join', (userId: string) => {
    socket.join(userId);

    console.log(
      `Socket ${socket.id} joined room ${userId}`
    );

    console.log(
      'Rooms:',
      Array.from(socket.rooms)
    );
  });
};