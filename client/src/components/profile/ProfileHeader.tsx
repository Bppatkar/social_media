'use client';

import { useState } from 'react';
import { Camera, Edit3, UserPlus, UserCheck } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import EditProfileDialog from './EditProfileDialog';

export interface ProfileUser {
  _id: string;

  username: string;

  email: string;

  bio?: string;

  profileImage?: string;

  role: 'user' | 'admin';

  followersCount: number;

  followingCount: number;

  postsCount: number;

  isFollowing: boolean;

  isCurrentUser: boolean;
}

interface ProfileHeaderProps {
  user: ProfileUser;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [editOpen, setEditOpen] = useState(false);

  const handleFollow = () => {
    // Follow Mutation
  };

  const handleEditProfile = () => {
    setEditOpen(true);
  };

  const handleChangePhoto = () => {
    // Upload Profile Image
  };

  return (
    <>
      <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
        {/* Cover */}

        <div className="h-48 bg-linear-to-r from-violet-700 via-indigo-700 to-sky-700" />

        <div className="relative px-8 pb-8">
          {/* Avatar */}

          <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="relative w-fit">
              <UserAvatar
                src={user.profileImage}
                alt={user.username}
                size="lg"
              />

              {user.isCurrentUser && (
                <Button
                  size="icon"
                  onClick={handleChangePhoto}
                  className="absolute right-0 bottom-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            {user.isCurrentUser ? (
              <Button onClick={handleEditProfile} className="rounded-full">
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={handleFollow}
                className="rounded-full"
                variant={user.isFollowing ? 'secondary' : 'default'}
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
            )}
          </div>

          {/* User */}

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{user.username}</h1>

              {user.role === 'admin' && (
                <Badge className="bg-red-600">Admin</Badge>
              )}
            </div>

            <p className="text-zinc-400">@{user.username}</p>

            {user.bio && (
              <p className="max-w-3xl leading-7 text-zinc-300">{user.bio}</p>
            )}
          </div>

          {/* Stats */}

          <div className="mt-8 grid grid-cols-3 border-t border-white/10 pt-6">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {user.postsCount}
              </h3>

              <p className="text-zinc-400">Posts</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                {user.followersCount}
              </h3>

              <p className="text-zinc-400">Followers</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                {user.followingCount}
              </h3>

              <p className="text-zinc-400">Following</p>
            </div>
          </div>
        </div>
      </Card>
      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
}
