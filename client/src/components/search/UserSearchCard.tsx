'use client';

import { UserPlus, UserCheck } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface SearchUser {
  _id: string;
  username: string;
  bio?: string;
  profileImage?: string;
  role: 'user' | 'admin';
  followersCount: number;
  isFollowing: boolean;
}

interface UserSearchCardProps {
  user: SearchUser;
}

export default function UserSearchCard({
  user,
}: UserSearchCardProps) {
  const handleFollow = () => {
    // RTK Follow Mutation
  };

  const handleOpenProfile = () => {
    // router.push(`/profile/${user._id}`)
  };

  return (
    <Card className="border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:border-violet-500/30">
      <div className="flex items-center justify-between gap-5">
        <div
          className="flex flex-1 cursor-pointer items-center gap-4"
          onClick={handleOpenProfile}
        >
          <UserAvatar
            src={user.profileImage}
            alt={user.username}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-lg font-semibold text-white">
                {user.username}
              </h3>

              {user.role === 'admin' && (
                <Badge className="bg-red-600">
                  Admin
                </Badge>
              )}
            </div>

            <p className="truncate text-sm text-zinc-400">
              @{user.username}
            </p>

            {user.bio && (
              <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                {user.bio}
              </p>
            )}

            <p className="mt-3 text-sm text-zinc-500">
              {user.followersCount} Followers
            </p>
          </div>
        </div>

        <Button
          onClick={handleFollow}
          variant={user.isFollowing ? 'secondary' : 'default'}
          className="rounded-full"
        >
          {user.isFollowing ? (
            <>
              <UserCheck className="mr-2 h-4 w-4" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Follow
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}