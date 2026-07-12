'use client';

import Link from 'next/link';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';

import { Card } from '@/components/ui/card';

import type { Notification } from '@/types';
import { useMarkNotificationAsReadMutation } from '@/features/notification/notificationApi';
import {
  getNotificationIcon,
  getNotificationText,
  getNotificationHref,
} from '@/utils/notificationHelper';
import { memo } from 'react';

interface Props {
  notification: Notification;
}

function NotificationCard({ notification }: Props) {
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

  return (
    <Link href={getNotificationHref(notification)} onClick={handleClick}>
      <Card
        className={`border-white/10 p-5 transition-all duration-200 hover:border-violet-500/40 hover:shadow-lg ${
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
                {getNotificationIcon(notification.type)}

                <p className="text-white">
                  <span className="font-semibold">
                    {notification.sender.username}
                  </span>{' '}
                  {getNotificationText(notification.type)}
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

export default memo(NotificationCard);
