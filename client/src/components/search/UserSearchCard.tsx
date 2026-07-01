'use client';

import {
  UserPlus,
  UserCheck,
} from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface SearchUser {
  _id: string;

  username: string;

  email: string;

  bio?: string;

  profileImage?: string;

  followers: number;

  isFollowing: boolean;

  role: 'user' | 'admin';
}

interface Props {
  user: SearchUser;
}

export default function UserSearchCard({
  user,
}: Props) {
  const handleFollow = () => {
    // TODO:
    // RTK Follow Mutation
  };

  return (
    <Card className="border-white/10 bg-white/5 p-5 transition hover:border-violet-500/30">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <UserAvatar
            src={user.profileImage}
            alt={user.username}
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">
                {user.username}
              </h3>

              {user.role === 'admin' && (
                <Badge className="bg-red-600">
                  Admin
                </Badge>
              )}
            </div>

            <p className="text-sm text-zinc-400">
              @{user.username}
            </p>

            {user.bio && (
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300">
                {user.bio}
              </p>
            )}

            <p className="mt-3 text-sm text-zinc-500">
              {user.followers} Followers
            </p>
          </div>
        </div>

        <Button
          onClick={handleFollow}
          variant={
            user.isFollowing
              ? 'secondary'
              : 'default'
          }
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