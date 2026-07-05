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
import { useGetFollowingQuery } from '@/features/follow/followApi';


interface FollowingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export default function FollowingDialog({
  open,
  onOpenChange,
  userId,
}: FollowingDialogProps) {
  const { data, isLoading } = useGetFollowingQuery(userId, {
    skip: !open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-900 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Following</DialogTitle>
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
              data?.following.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
                >
                  <UserAvatar
                    src={item.following?.profileImage}
                    alt={item.following?.username}
                    size="md"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-white">
                      {item.following?.username}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      @{item.following?.username}
                    </p>
                  </div>
                </div>
              ))}

            {!isLoading && data && data.following.length === 0 && (
              <div className="py-16 text-center text-zinc-500">
                Not following anyone yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
