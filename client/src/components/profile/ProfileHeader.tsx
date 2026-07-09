'use client';

import { useRef, useState } from 'react';
import { Camera, Edit3, UserCheck, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import type { User } from '@/types';

import UserAvatar from '@/components/shared/UserAvatar';
import EditProfileDialog from './EditProfileDialog';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { useFollow } from '@/hooks/useFollow';
import { getApiError } from '@/utils/getApiError';

import { useUpdateProfileMutation } from '@/features/profile/profileApi';

import FollowersDialog from './FollowersDialog';
import FollowingDialog from './FollowingDialog';
import UploadAvatarDialog from './UploadAvatarDialog';
import { useGetMeQuery } from '@/features/auth/api/authApi';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { refetch } = useGetMeQuery(undefined);

  const [editOpen, setEditOpen] = useState(false);

  const [followersOpen, setFollowersOpen] = useState(false);

  const [followingOpen, setFollowingOpen] = useState(false);

  const [avatarOpen, setAvatarOpen] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const { toggleFollow, isLoading } = useFollow();

  const [updateProfile, { isLoading: uploadingAvatar }] =
    useUpdateProfileMutation();

  const handleFollow = async () => {
    await toggleFollow(user._id, user.isFollowing);
  };

  const handleAvatarClick = () => {
    fileRef.current?.click();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append('username', user.username);

    if (user.bio) {
      formData.append('bio', user.bio);
    }

    formData.append('profileImage', file);

    try {
      await updateProfile(formData).unwrap();

      toast.success('Profile photo updated.');

      refetch();
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <>
      <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
        {/* Cover */}
        <div className="h-48 bg-linear-to-r from-violet-700 via-indigo-700 to-sky-700" />
        <div className="relative px-8 pb-8">
          {/* Avatar + Buttons */}
          <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="relative w-fit">
              <UserAvatar
                src={user.profileImage}
                alt={user.username}
                size="lg"
              />

              {user.isCurrentUser && (
                <>
                  <input
                    hidden
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />

                  <Button
                    size="icon"
                    disabled={uploadingAvatar}
                    onClick={handleAvatarClick}
                    className="absolute right-0 bottom-0 rounded-full"
                  >
                    {uploadingAvatar ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </Button>
                </>
              )}
            </div>

            {user.isCurrentUser ? (
              <Button
                className="rounded-full"
                onClick={() => setEditOpen(true)}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <Button
                className="rounded-full"
                disabled={isLoading}
                onClick={handleFollow}
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
          {/* User Info */}
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

            {/* Stats */}
            {/* Stats */}

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => setFollowersOpen(true)}
                className="rounded-xl p-3 text-center transition hover:bg-white/5"
              >
                <h3 className="text-2xl font-bold text-white">
                  {user.followersCount}
                </h3>

                <p className="text-sm text-zinc-400">Followers</p>
              </button>

              <button
                type="button"
                onClick={() => setFollowingOpen(true)}
                className="rounded-xl p-3 text-center transition hover:bg-white/5"
              >
                <h3 className="text-2xl font-bold text-white">
                  {user.followingCount}
                </h3>

                <p className="text-sm text-zinc-400">Following</p>
              </button>

              <div className="rounded-xl p-3 text-center">
                <h3 className="text-2xl font-bold text-white">
                  {user.postsCount}
                </h3>

                <p className="text-sm text-zinc-400">Posts</p>
              </div>
            </div>
          </div>{' '}
          {/* <-- CLOSE mt-6 space-y-3 */}
        </div>{' '}
        {/* <-- CLOSE relative px-8 pb-8 */}
      </Card>

      {/* Dialogs */}

      {user.isCurrentUser && (
        <>
          <UploadAvatarDialog open={avatarOpen} onOpenChange={setAvatarOpen} />

          <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />
        </>
      )}

      <FollowersDialog
        open={followersOpen}
        onOpenChange={setFollowersOpen}
        userId={user._id}
      />

      <FollowingDialog
        open={followingOpen}
        onOpenChange={setFollowingOpen}
        userId={user._id}
      />
    </>
  );
}
