'use client';

import LoadingState from '@/components/feedback/LoadingState';
import ErrorState from '@/components/feedback/ErrorState';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfilePhotos from '@/components/profile/ProfilePhotos';
import ProfileTabs from '@/components/profile/ProfileTabs';

import PostCard from '@/components/post/PostCard';

import {
  useGetUserProfileQuery,
  useGetUserPostsQuery,
  useGetMyProfileQuery,
} from '@/features/profile/profileApi';

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserProfileQuery(id);

  const { data: me } = useGetMyProfileQuery();

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
