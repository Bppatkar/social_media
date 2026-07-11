'use client';

import { useEffect, useRef, useState } from 'react';
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
import { useGetMeQuery } from '@/features/auth/api/authApi';
import Link from 'next/link';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { refetch } = useGetMeQuery(undefined);
  const [profileUser, setProfileUser] = useState(user);
  const [editOpen, setEditOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const { toggleFollow, isLoading } = useFollow();
  const [updateProfile, { isLoading: uploadingProfile }] =
    useUpdateProfileMutation();

  useEffect(() => {
    setProfileUser(user);
  }, [user]);

  const handleFollow = async () => {
    const nextIsFollowing = !profileUser.isFollowing;
    const previousUser = profileUser;

    setProfileUser({
      ...profileUser,
      isFollowing: nextIsFollowing,
      followersCount: Math.max(
        0,
        profileUser.followersCount + (nextIsFollowing ? 1 : -1)
      ),
    });

    const success = await toggleFollow(
      profileUser._id,
      profileUser.isFollowing
    );

    if (!success) {
      setProfileUser(previousUser);
    }
  };

  const handleAvatarClick = () => {
    avatarRef.current?.click();
  };

  const handleCoverClick = () => {
    coverRef.current?.click();
  };

  const uploadProfileImage = async (
    file: File,
    fieldName: 'profileImage' | 'coverImage',
    successMessage: string
  ) => {
    const formData = new FormData();
    formData.append('username', profileUser.username);

    if (profileUser.bio) {
      formData.append('bio', profileUser.bio);
    }

    formData.append(fieldName, file);

    await updateProfile(formData).unwrap();
    toast.success(successMessage);
    await refetch();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB.');
      return;
    }

    try {
      await uploadProfileImage(file, 'profileImage', 'Profile photo updated.');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB.');
      return;
    }

    try {
      await uploadProfileImage(file, 'coverImage', 'Cover photo updated.');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <>
      <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
        {/* Cover */}
        <div className="relative h-48 overflow-hidden">
          {profileUser.coverImage ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profileUser.coverImage})` }}
            />
          ) : (
            <div className="h-full w-full bg-linear-to-r from-violet-700 via-indigo-700 to-sky-700" />
          )}

          {user.isCurrentUser && (
            <>
              <input
                hidden
                ref={coverRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
              />

              <Button
                size="sm"
                variant="secondary"
                disabled={uploadingProfile}
                onClick={handleCoverClick}
                className="absolute top-4 right-4 rounded-full bg-black/40 text-white hover:bg-black/60"
              >
                {uploadingProfile ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="mr-2 h-4 w-4" />
                )}
                Cover
              </Button>
            </>
          )}
        </div>
        <div className="relative px-8 pb-8">
          {/* Avatar + Buttons */}
          <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="relative w-fit">
              <UserAvatar
                src={profileUser.profileImage}
                alt={profileUser.username}
                size="lg"
              />

              {user.isCurrentUser && (
                <>
                  <input
                    hidden
                    ref={avatarRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />

                  <Button
                    size="icon"
                    disabled={uploadingProfile}
                    onClick={handleAvatarClick}
                    className="absolute right-0 bottom-0 rounded-full"
                  >
                    {uploadingProfile ? (
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
                variant={profileUser.isFollowing ? 'secondary' : 'default'}
              >
                {profileUser.isFollowing ? (
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
              <h1 className="text-3xl font-bold text-white">
                <Link href={`/profile/${profileUser._id}`}>
                  {profileUser.username}
                </Link>
              </h1>

              {user.role === 'admin' && (
                <Badge className="bg-red-600">Admin</Badge>
              )}
            </div>

            <p className="text-zinc-400 select-all">
              <Link href={`/profile/${profileUser._id}`}>
                @{profileUser.username}
              </Link>
            </p>

            {profileUser.bio && (
              <p className="max-w-3xl leading-7 text-zinc-300">
                {profileUser.bio}
              </p>
            )}

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => setFollowersOpen(true)}
                className="rounded-xl p-3 text-center transition hover:bg-white/5"
              >
                <h3 className="text-2xl font-bold text-white">
                  {profileUser.followersCount}
                </h3>

                <p className="text-sm text-zinc-400">Followers</p>
              </button>

              <button
                type="button"
                onClick={() => setFollowingOpen(true)}
                className="rounded-xl p-3 text-center transition hover:bg-white/5"
              >
                <h3 className="text-2xl font-bold text-white">
                  {profileUser.followingCount}
                </h3>

                <p className="text-sm text-zinc-400">Following</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById('profile-posts')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="rounded-xl p-3 text-center transition hover:bg-white/5"
              >
                <h3 className="text-2xl font-bold text-white">
                  {profileUser.postsCount}
                </h3>

                <p className="text-sm text-zinc-400">Posts</p>
              </button>
            </div>
          </div>{' '}
        </div>{' '}
      </Card>

      {/* Dialogs */}

      {user.isCurrentUser && (
        <>
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
