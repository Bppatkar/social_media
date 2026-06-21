import type { Socket } from 'socket.io';

export const registerNotificationEvents = (socket: Socket) => {
  socket.on('join', (userId: string) => {
    socket.join(userId);

    console.log(`User ${userId} joined room ${userId}`);
  });
};