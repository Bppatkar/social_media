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
    console.log('Emitting notification to room:', recipientId, notification);

    getIo().to(recipientId).emit('notification', notification);
  } catch {
    // Ignore when socket server is unavailable
  }
};

type FeedUpdatePayload = {
  entity: 'post' | 'comment' | 'like';
  action: 'created' | 'updated' | 'deleted';
  postId?: string;
};

export const emitFeedUpdate = (payload: FeedUpdatePayload) => {
  try {
    getIo().emit('feed:update', payload);
  } catch {
    // Ignore when socket server is unavailable
  }
};
