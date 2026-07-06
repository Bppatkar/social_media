'use client';

import Link from 'next/link';
import NotificationDropdownItem from './NotificationDropdownItem';
import LoadingState from '@/components/feedback/LoadingState';

import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from '@/features/notification/notificationApi';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getApiError } from '@/utils/getApiError';

export default function NotificationDropdown() {
  const { data, isLoading } = useGetNotificationsQuery();

  const [markAllRead, { isLoading: marking }] =
    useMarkAllNotificationsAsReadMutation();

  const notifications = data?.data ?? [];

  const latest = notifications.slice(0, 5);

  const hasUnread = notifications.some((n) => !n.isRead);

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();

      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="w-90">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h3 className="font-semibold text-white">Notifications</h3>

        <Button
          variant="ghost"
          size="sm"
          disabled={!hasUnread || marking}
          onClick={handleMarkAllRead}
        >
          Mark all
        </Button>
      </div>

      <div className="max-h-105 overflow-y-auto">
        {latest.length === 0 ? (
          <p className="p-6 text-center text-sm text-zinc-400">
            You're all caught up.
          </p>
        ) : (
          latest.map((notification) => (
            <NotificationDropdownItem
              key={notification._id}
              notification={notification}
            />
          ))
        )}
      </div>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/notifications"
          className="block rounded-md py-2 text-center text-sm font-medium text-violet-400 transition hover:bg-white/5"
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
}
