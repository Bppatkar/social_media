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
