'use client';

import NotificationCard from './NotificationCard';

import EmptyState from '@/components/feedback/EmptyState';

import type { Notification } from '@/types';

interface Props {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: Props) {
  if (!notifications.length) {
    return (
      <EmptyState
        title="No Notifications"
        description="You're all caught up."
      />
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard key={notification._id} notification={notification} />
      ))}
    </div>
  );
}
