import { getIo } from './socket.js';

type FeedUpdatePayload = {
  entity: 'post' | 'comment' | 'like';
  action: 'created' | 'updated' | 'deleted';
  postId?: string;
};

export const emitFeedUpdate = (payload: FeedUpdatePayload) => {
  try {
    getIo().emit('feed:update', payload);
  } catch {
    // ignore when socket server is unavailable
  }
};
