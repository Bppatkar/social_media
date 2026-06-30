'use client';

import NotificationList from '@/components/notification/NotificationList';

import type { Notification } from '@/components/notification/NotificationCard';

export default function NotificationsPage() {
  const notifications: Notification[] = [
    {
      _id: '1',
      type: 'follow',
      title: 'New Follower',
      message: 'Alex started following you.',
      createdAt: new Date().toISOString(),
      isRead: false,
      link: '/profile/2',
    },
    {
      _id: '2',
      type: 'like',
      title: 'New Like',
      message: 'Sarah liked your latest post.',
      createdAt: new Date().toISOString(),
      isRead: true,
      link: '/feed',
    },
    {
      _id: '3',
      type: 'comment',
      title: 'New Comment',
      message: 'John commented on your post.',
      createdAt: new Date().toISOString(),
      isRead: false,
      link: '/feed',
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Notifications</h1>

        <p className="mt-2 text-zinc-400">Stay updated with recent activity.</p>
      </div>

      <NotificationList notifications={notifications} />
    </div>
  );
}
