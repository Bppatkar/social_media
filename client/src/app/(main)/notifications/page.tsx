import EmptyState from '@/components/feedback/EmptyState';

import NotificationCard, {
  type Notification,
} from '@/components/notification/NotificationCard';

export default function NotificationsPage() {
  const notifications: Notification[] = [
    {
      _id: '1',
      type: 'follow',
      createdAt: new Date().toISOString(),
      isRead: false,

      sender: {
        username: 'Rahul',
        profileImage: '',
      },
    },
    {
      _id: '2',
      type: 'like',
      createdAt: new Date().toISOString(),
      isRead: false,

      sender: {
        username: 'Alex',
        profileImage: '',
      },
    },
    {
      _id: '3',
      type: 'comment',
      createdAt: new Date().toISOString(),
      isRead: true,

      sender: {
        username: 'John',
        profileImage: '',
      },
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <h1 className="text-3xl font-bold text-white mt-2">Notifications</h1>

      {notifications.length === 0 ? (
        <EmptyState
          title="No Notifications"
          description="You're all caught up."
        />
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
          />
        ))
      )}
    </div>
  );
}
