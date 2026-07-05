'use client';

import Link from 'next/link';

import { Heart, MessageCircle, UserPlus } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';

import { Card } from '@/components/ui/card';

import type { Notification } from '@/types';
import { useMarkNotificationAsReadMutation } from '@/features/notification/notificationApi';

interface Props {
  notification: Notification;
}

export default function NotificationCard({ notification }: Props) {
  const [markRead] = useMarkNotificationAsReadMutation();

  const handleClick = async () => {
    if (!notification.isRead) {
      try {
        await markRead(notification._id).unwrap();
      } catch {
        //
      }
    }
  };

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

  const renderText = () => {
    switch (notification.type) {
      case 'like':
        return 'liked your post';

      case 'comment':
        return 'commented on your post';

      case 'follow':
        return 'started following you';
    }
  };

  const href = notification.post
    ? '/feed'
    : `/profile/${notification.sender._id}`;

  return (
    <Link href={href} onClick={handleClick}>
      <Card
        className={`border-white/10 p-5 transition hover:border-violet-500/30 ${
          notification.isRead
            ? 'bg-white/5'
            : 'border-violet-500/40 bg-violet-500/10'
        }`}
      >
        <div className="flex gap-4">
          <UserAvatar
            src={notification.sender.profileImage}
            alt={notification.sender.username}
          />

          <div className="flex flex-1 justify-between">
            <div>
              <div className="flex items-center gap-2">
                {renderIcon()}

                <p className="text-white">
                  <span className="font-semibold">
                    {notification.sender.username}
                  </span>{' '}
                  {renderText()}
                </p>
              </div>

              <div className="mt-2">
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
