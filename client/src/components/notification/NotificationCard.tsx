'use client';

import Link from 'next/link';
import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TimeAgo from '@/components/shared/TimeAgo';

export interface Notification {
  _id: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link: string;
}

interface NotificationCardProps {
  notification: Notification;
}

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const handleMarkRead = () => {
    // RTK Mutation
  };

  const icon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;

      case 'comment':
        return <MessageCircle className="h-5 w-5 text-sky-500" />;

      case 'follow':
        return <UserPlus className="h-5 w-5 text-violet-500" />;

      default:
        return <Bell className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Card
      className={`border-white/10 bg-white/5 p-5 transition ${
        !notification.isRead && 'border-violet-500/40'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-white/5 p-3">{icon()}</div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-white">{notification.title}</h3>

            {!notification.isRead && (
              <Badge className="bg-violet-600">New</Badge>
            )}
          </div>

          <p className="mt-2 text-zinc-300">{notification.message}</p>

          <div className="mt-4 flex items-center justify-between">
            <TimeAgo date={notification.createdAt} />

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleMarkRead}>
                Mark Read
              </Button>

              <Button asChild size="sm">
                <Link href={notification.link}>View</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
