import { getIo } from './socket.js';

import type { NotificationPayload } from '../types/notification.types.js';

type EmitNotificationPayload = {
  recipientId: string;
  notification: NotificationPayload;
};

export const emitNotification = ({
  recipientId,
  notification,
}: EmitNotificationPayload) => {
  try {
    getIo().to(recipientId).emit('notification', notification);
  } catch {
    // Ignore when socket server is unavailable
  }
};
