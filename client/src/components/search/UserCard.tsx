'use client';

import Link from 'next/link';
import { UserPlus, UserCheck } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface SearchUser {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  profileImage?: string;
  followersCount: number;
  isFollowing: boolean;
}

interface UserCardProps {
  user: SearchUser;
}

export default function UserCard({ user }: UserCardProps) {
  const handleFollow = () => {
    // RTK Follow Mutation
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-violet-500/40">
      <div className="flex items-center justify-between p-5">
        <Link
          href={`/profile/${user._id}`}
          className="flex flex-1 items-center gap-4"
        >
          <UserAvatar src={user.profileImage} alt={user.username} size="lg" />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-white">
              {user.username}
            </h3>

            <p className="truncate text-sm text-zinc-400">@{user.username}</p>

            {user.bio && (
              <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                {user.bio}
              </p>
            )}

            <p className="mt-3 text-xs text-zinc-500">
              {user.followersCount} Followers
            </p>
          </div>
        </Link>

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
