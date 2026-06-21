import Notification from '../models/notification.model.js';

export const createNotificationService = async (
  recipient: string,
  sender: string,
  type: 'follow' | 'like' | 'comment',
  post?: string
) => {

  const payload: {
    recipient: string;
    sender: string;
    type: 'follow' | 'like' | 'comment';
    post?: string;
  } = {
    recipient,
    sender,
    type,
  };

  if (post) {
    payload.post = post;
  }

  return Notification.create(payload);
};