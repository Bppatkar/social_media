import CreatePostCard from '@/components/post/CreatePostCard';
import EmptyState from '@/components/feedback/EmptyState';
import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';
import PostCard from '@/components/post/PostCard';
import type { Post } from '@/components/post/PostCard';

export default function FeedPage() {
  const isLoading = false;
  const isError = false;

  const posts: Post[] = [
    {
      _id: '1',
      content:
        'Building a production-ready Social Media Platform using Next.js 15 🚀',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeCount: 120,
      commentCount: 35,
      owner: {
        _id: '101',
        username: 'Bhanu',
        profileImage: '',
      },
    },
    {
      _id: '2',
      content: 'Today completed Socket.IO Notifications + Redis Cache 🔥',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeCount: 82,
      commentCount: 14,
      owner: {
        _id: '102',
        username: 'Alex',
        profileImage: '',
      },
    },
  ];

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
            isOwner={post.owner._id === '101'} // TODO: Replace with logged-in user id
          />
        ))
      )}
    </div>
  );
}
