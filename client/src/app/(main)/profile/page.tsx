'use client';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfilePhotos from '@/components/profile/ProfilePhotos';

import PostCard from '@/components/post/PostCard';
import { useGetUserPostsQuery } from '@/features/feed/postApi';
import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import EmptyState from '@/components/feedback/EmptyState';



export default function ProfilePage() {
  const {
    data: me,
    isLoading: userLoading,
    isError: userError,
  } = useGetMeQuery();

  const {
    data: posts,
    isLoading: postLoading,
    isError: postError,
  } = useGetUserPostsQuery(me?._id ?? '', {
    skip: !me,
  });

  if (userLoading || postLoading) {
    return <LoadingState />;
  }

  if (userError || postError || !me) {
    return (
      <ErrorState
        title="Profile not found"
        description="Unable to load profile."
      />
    );
  }
  const images =
    posts?.filter((post) => post.image).map((post) => post.image!) ?? [];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <ProfileHeader user={me} />

      <ProfileTabs
        posts={
          <div className="space-y-6">
            {posts?.length === 0 ? (
              <EmptyState
                title="No posts yet"
                description="This user has not created any posts yet."
              />
            ) : (
              posts?.map((post) => (
                <PostCard key={post._id} post={post} isOwner />
              ))
            )}
          </div>
        }
        photos={<ProfilePhotos images={images} />}
      />
    </div>
  );
}
