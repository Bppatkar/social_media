'use client';

import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';

import { Card } from '@/components/ui/card';

export interface Notification {
  _id: string;

  type: 'like' | 'comment' | 'follow';

  sender: {
    username: string;

    profileImage?: string;
  };

  createdAt: string;

  isRead: boolean;
}

interface NotificationCardProps {
  notification: Notification;
}

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-400" />;

      case 'comment':
        return <MessageCircle className="h-5 w-5 text-sky-400" />;

      case 'follow':
        return <UserPlus className="h-5 w-5 text-emerald-400" />;

      default:
        return <Bell className="h-5 w-5 text-violet-400" />;
    }
  };

  return (
    <Card className="border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-violet-500/30">
      <div className="flex items-center gap-4">
        <UserAvatar
          src={notification.sender.profileImage}
          alt={notification.sender.username}
        />

        <div className="flex-1">
          <p className="text-white">
            <span className="font-semibold">
              {notification.sender.username}
            </span>{' '}
            {notification.type === 'follow' &&
              'started following you.'}

            {notification.type === 'like' &&
              'liked your post.'}

            {notification.type === 'comment' &&
              'commented on your post.'}
          </p>

          <TimeAgo date={notification.createdAt} />
        </div>

        <div>{getIcon()}</div>
      </div>
    </Card>
  );
}