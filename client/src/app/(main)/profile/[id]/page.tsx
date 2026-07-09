'use client';

import LoadingState from '@/components/feedback/LoadingState';
import ErrorState from '@/components/feedback/ErrorState';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfilePhotos from '@/components/profile/ProfilePhotos';
import ProfileTabs from '@/components/profile/ProfileTabs';

import PostCard from '@/components/post/PostCard';

import { useGetUserPostsQuery } from '@/features/feed/postApi';
import { useGetUserProfileQuery } from '@/features/profile/profileApi';
import { use } from 'react';
import { useGetMeQuery } from '@/features/auth/api/authApi';

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserProfileQuery(id);

  const { data: me } = useGetMeQuery();

  const {
    data: posts = [],
    isLoading: postLoading,
    isError: postError,
  } = useGetUserPostsQuery(id);

  if (userLoading || postLoading) {
    return <LoadingState />;
  }

  if (userError || postError || !user) {
    return (
      <ErrorState
        title="Profile not found"
        description="Unable to load profile."
      />
    );
  }

  const images = posts.filter((post) => post.image).map((post) => post.image!);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <ProfileHeader
        user={{
          ...user,
          isCurrentUser: me?._id === user._id,
        }}
      />

      <ProfileTabs
        posts={
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                isOwner={me?._id === user._id}
              />
            ))}
          </div>
        }
        photos={<ProfilePhotos images={images} />}
      />
    </div>
  );
}
