'use client';

import NotificationCard from './NotificationCard';

import EmptyState from '@/components/feedback/EmptyState';

import type { Notification } from './NotificationCard';

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        title="No Notifications"
        description="You're all caught up."
      />
    );
  }

  return (
    <div className="space-y-5">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
        />
      ))}
    </div>
  );
}