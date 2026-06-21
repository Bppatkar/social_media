import type {Document} from 'mongoose';

export interface INotification extends Document{
  recipient: string;
  sender: string;
  type: 'follow' | 'like' | 'comment';
  post?: string;
  isRead: boolean;
  createdAt: Date;
}

