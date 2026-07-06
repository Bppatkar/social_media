'use client';

import Link from 'next/link';

import UserAvatar from '@/components/shared/UserAvatar';
import TimeAgo from '@/components/shared/TimeAgo';

import { useMarkNotificationAsReadMutation } from '@/features/notification/notificationApi';
import {
  getNotificationHref,
  getNotificationIcon,
  getNotificationText,
} from '@/utils/notificationHelper';

import type { Notification } from '@/types';

interface Props {
  notification: Notification;
}

export default function NotificationDropdownItem({ notification }: Props) {
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
    <Link
      href={getNotificationHref(notification)}
      onClick={handleClick}
      className="flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-white/5"
    >
      <UserAvatar
        src={notification.sender.profileImage}
        alt={notification.sender.username}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {getNotificationIcon(notification.type)}

          <p className="truncate text-sm text-white">
            <span className="font-semibold">
              {notification.sender.username}
            </span>{' '}
            {getNotificationText(notification.type)}
          </p>
        </div>

        <TimeAgo date={notification.createdAt} />
      </div>

      {!notification.isRead && (
        <div className="mt-2 h-2.5 w-2.5 rounded-full bg-violet-500" />
      )}
    </Link>
  );
}
