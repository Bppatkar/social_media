'use client';

import Link from 'next/link';

import { Heart, MessageCircle, UserPlus } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';

import { Card } from '@/components/ui/card';

export interface Notification {
  _id: string;

  type: 'like' | 'comment' | 'follow';

  username: string;

  profileImage?: string;

  createdAt: string;

  postId?: string;

  isRead: boolean;
}

interface Props {
  notification: Notification;
}

export default function NotificationCard({ notification }: Props) {
  const renderIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;

      case 'comment':
        return <MessageCircle className="h-5 w-5 text-sky-500" />;

      case 'follow':
        return <UserPlus className="h-5 w-5 text-violet-500" />;
    }
  };

  const renderMessage = () => {
    switch (notification.type) {
      case 'like':
        return 'liked your post';

      case 'comment':
        return 'commented on your post';

      case 'follow':
        return 'started following you';
    }
  };

  return (
    <Link href={notification.postId ? '/feed' : '/profile'}>
      <Card
        className={`border-white/10 p-5 transition hover:border-violet-500/30 ${
          notification.isRead
            ? 'bg-white/5'
            : 'border-violet-500/40 bg-violet-500/10'
        } `}
      >
        <div className="flex gap-4">
          <UserAvatar
            src={notification.profileImage}
            alt={notification.username}
          />

          <div className="flex flex-1 justify-between">
            <div>
              <div className="flex items-center gap-2">
                {renderIcon()}

                <p className="text-white">
                  <span className="font-semibold">{notification.username}</span>{' '}
                  {renderMessage()}
                </p>
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                <TimeAgo date={notification.createdAt} />
              </div>
            </div>

            {!notification.isRead && (
              <div className="mt-1 h-3 w-3 rounded-full bg-violet-500" />
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
