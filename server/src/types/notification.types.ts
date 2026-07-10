import type { Document, Types } from 'mongoose';

export interface INotification extends Document {
  recipient: Types.ObjectId;
  sender: Types.ObjectId;
  type: 'follow' | 'like' | 'comment';
  post?: Types.ObjectId;
  isRead: boolean;
  createdAt: Date;
}

export interface PopulatedNotificationSender {
  _id: Types.ObjectId;
  username: string;
  profileImage?: string;
}

export interface NotificationPayload {
  id: string;
  type: 'follow' | 'like' | 'comment';
  sender: NotificationSenderPayload;
  postId?: string;
  createdAt: Date;
}

export interface NotificationSenderPayload {
  _id: string;
  username: string;
  profileImage?: string;
}