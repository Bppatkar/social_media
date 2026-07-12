'use client';

import NotificationList from '@/components/notification/NotificationList';

import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from '@/features/notification/notificationApi';
import { getApiError } from '@/utils/getApiError';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';



export default function NotificationsPage() {
  const { data, isLoading, isError } = useGetNotificationsQuery();

  const [markAllRead, { isLoading: marking }] =
    useMarkAllNotificationsAsReadMutation();

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();

      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

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
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>

          <p className="mt-2 text-zinc-400">
            Stay updated with likes, comments and followers.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllRead}
          disabled={marking || !hasUnread}
          className="border-white/10 bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white"
        >
          Mark all as read
        </Button>
      </div>

      <NotificationList notifications={notifications} />
    </div>
  );
}
