import ProfileHeader, {
  type ProfileUser,
} from '@/components/profile/ProfileHeader';
import EmptyState from '@/components/feedback/EmptyState';
import PostCard, { type Post } from '@/components/post/PostCard';

export default function ProfilePage() {
  const user: ProfileUser = {
    _id: '1',
    username: 'Bhanu',
    email: 'bhanu@gmail.com',
    bio: 'Full Stack Developer | MERN | Next.js | Building production-grade applications 🚀',
    profileImage: '',
    role: 'user',
    followersCount: 324,
    followingCount: 188,
    postsCount: 42,
    isFollowing: false,
    isCurrentUser: true,
  };

  const posts: Post[] = [
    {
      _id: '1',
      content:
        'Finished building Feed UI for SocialSphere. Next step is RTK Query integration.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeCount: 142,
      commentCount: 18,
      owner: {
        _id: user._id,
        username: user.username,
        profileImage: user.profileImage,
      },
    },
    {
      _id: '2',
      content:
        'Backend is production ready with Redis, Docker, AWS, Swagger and Socket.IO.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeCount: 87,
      commentCount: 9,
      owner: {
        _id: user._id,
        username: user.username,
        profileImage: user.profileImage,
      },
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <ProfileHeader user={user} />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Posts</h2>

        {posts.length === 0 ? (
          <EmptyState
            title="No Posts Yet"
            description="Posts created by this user will appear here."
          />
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </section>
    </div>
  );
}