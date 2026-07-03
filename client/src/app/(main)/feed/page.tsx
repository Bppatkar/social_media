'use client';

import CreatePostCard from '@/components/post/CreatePostCard';
import EmptyState from '@/components/feedback/EmptyState';
import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';
import PostCard from '@/components/post/PostCard';
import { useGetFeedPostsQuery } from '@/features/feed/postApi';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/features/auth/authSelectors';

export default function FeedPage() {
  const { data, isLoading, isError } = useGetFeedPostsQuery();
  const posts = data?.data.posts ?? [];
  const currentUser = useAppSelector(selectUser);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState title="Unable to load feed" description="Please try again." />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <CreatePostCard />

      {posts.length === 0 ? (
        <EmptyState
          title="No Posts Yet"
          description="Be the first one to share something."
        />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            variants="feed"
            isOwner={post.owner._id === currentUser?._id}
          />
        ))
      )}
    </div>
  );
}
