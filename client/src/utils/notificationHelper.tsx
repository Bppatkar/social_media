import { createElement } from 'react';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';
import type { Notification } from '@/types';

export function getNotificationIcon(
  type: Notification['type'],
  size = 'h-5 w-5'
) {
  switch (type) {
    case 'like':
      return <Heart className={`${size} text-red-500`} />;

    case 'comment':
      return <MessageCircle className={`${size} text-sky-500`} />;

    case 'follow':
      return <UserPlus className={`${size} text-violet-500`} />;
  }
}

export function getNotificationText(type: Notification['type']) {
  switch (type) {
    case 'like':
      return 'liked your post';

    case 'comment':
      return 'commented on your post';

    case 'follow':
      return 'started following you';
  }
}

export function getNotificationHref(notification: Notification) {
  if (notification.post) {
    const post = notification.post as string | { _id: string };
    const postId = typeof post === 'string' ? post : post._id;
    return `/feed?post=${postId}`;
  }

  return `/profile/${notification.sender._id}`;
}
