'use client';

import NotificationList from '@/components/notification/NotificationList';

import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';
import { useGetNotificationsQuery } from '@/features/notification/notificationApi';

export default function NotificationsPage() {
  const { data, isLoading, isError } = useGetNotificationsQuery();

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

  const notifications = data?.data ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Notifications</h1>

        <p className="mt-2 text-zinc-400">
          Stay updated with likes, comments and followers.
        </p>
      </div>

      <NotificationList notifications={notifications} />
    </div>
  );
}
