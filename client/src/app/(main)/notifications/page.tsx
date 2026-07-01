'use client';

import NotificationCard, {
  type Notification,
} from '@/components/notification/NotificationCard';

import EmptyState from '@/components/feedback/EmptyState';
import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';

export default function NotificationsPage() {
  // ==========================
  // Future RTK Query
  // ==========================
  //
  // const {
  //     data,
  //     isLoading,
  //     isError
  // } = useGetNotificationsQuery();

  const isLoading = false;

  const isError = false;

  const notifications: Notification[] = [
    {
      _id: '1',

      type: 'like',

      username: 'Alex',

      createdAt: new Date().toISOString(),

      isRead: false,

      postId: '1',
    },

    {
      _id: '2',

      type: 'comment',

      username: 'John',

      createdAt: new Date().toISOString(),

      isRead: true,

      postId: '1',
    },

    {
      _id: '3',

      type: 'follow',

      username: 'Sophia',

      createdAt: new Date().toISOString(),

      isRead: false,
    },
  ];

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load notifications"
        description="Please try again."
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Notifications</h1>

        <p className="mt-2 text-zinc-400">
          Stay updated with likes, comments and followers.
        </p>
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title="No Notifications"
          description="Everything is quiet for now."
        />
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
}
