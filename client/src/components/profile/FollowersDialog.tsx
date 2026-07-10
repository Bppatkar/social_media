'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

import UserAvatar from '@/components/shared/UserAvatar';
import { useGetFollowersQuery } from '@/features/follow/followApi';
import Link from 'next/link';

interface FollowersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export default function FollowersDialog({
  open,
  onOpenChange,
  userId,
}: FollowersDialogProps) {
  const { data, isLoading } = useGetFollowersQuery(userId, {
    skip: !open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-900 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Followers</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-96">
          <div className="space-y-3 pr-2">
            {isLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-white/10 p-3"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}

            {!isLoading &&
              data?.followers.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
                >
                  <Link
                    href={`/profile/${item.follower?._id}`}
                    onClick={() => onOpenChange(false)}
                  >
                    <UserAvatar
                      src={item.follower?.profileImage}
                      alt={item.follower?.username}
                      size="md"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-white">
                      <Link
                        href={`/profile/${item.follower?._id}`}
                        onClick={() => onOpenChange(false)}
                      >
                        {item.follower?.username}
                      </Link>
                    </h3>

                    <p className="text-sm text-zinc-400">
                      <Link
                        href={`/profile/${item.follower?._id}`}
                        onClick={() => onOpenChange(false)}
                      >
                        @{item.follower?.username}
                      </Link>
                    </p>
                  </div>
                </div>
              ))}

            {!isLoading && data && data.followers.length === 0 && (
              <div className="py-16 text-center text-zinc-500">
                No followers yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
