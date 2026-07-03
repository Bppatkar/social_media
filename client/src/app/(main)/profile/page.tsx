import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import ProfilePhotos from '@/components/profile/ProfilePhotos';

import PostCard from '@/components/post/PostCard';

import type { ProfileUser } from '@/components/profile/ProfileHeader';
import type { Post } from '@/types';

export default function ProfilePage() {
  const user: ProfileUser = {
    _id: '1',
    username: 'Bhanu',
    email: 'bhanu@gmail.com',
    bio: 'Building scalable backend systems using MERN, Next.js, Redis, Docker and AWS.',
    profileImage: '',
    role: 'user',
    followersCount: 180,
    followingCount: 95,
    postsCount: 24,
    isFollowing: false,
    isCurrentUser: true,
  };

  const posts: Post[] = [
    {
      _id: '1',
      content: 'Production Ready SocialSphere 🚀',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      likeCount: 85,
      commentCount: 12,
      likedByCurrentUser: false,

      owner: {
        _id: '1',
        username: 'Bhanu',
        profileImage: '',
      },
    },
  ];

  const images = posts.filter((post) => post.image).map((post) => post.image!);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <ProfileHeader user={user} />

      <ProfileTabs
        posts={
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} isOwner={user.isCurrentUser} />
            ))}
          </div>
        }
        photos={<ProfilePhotos images={images} />}
      />
    </div>
  );
}
