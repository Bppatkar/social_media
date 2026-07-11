import { io, Socket } from 'socket.io-client';
import env from './env';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(env.socketUrl, {
      autoConnect: false,
      withCredentials: true,
      transports: ['websocket'],
    });
  }

  return socket;
};

export const connectSocket = () => {
  const socket = getSocket();

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};