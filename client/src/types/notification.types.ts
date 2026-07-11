import type { Owner } from '@/types';

export interface Notification {
  _id: string;
  recipient: string;
  sender: Owner;
  type: 'like' | 'comment' | 'follow';
  post?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPayload {
  id: string;
  type: 'like' | 'comment' | 'follow';
  sender: {
    _id: string;
    username: string;
    profileImage?: string;
  };
  postId?: string;
  createdAt: string;
}

export interface NotificationResponse {
  status: string;
  data: Notification[];
}

export interface UnreadCountResponse {
  status: string;
  count: number;
}

export interface MarkNotificationReadResponse {
  status: string;
  data: Notification;
}
