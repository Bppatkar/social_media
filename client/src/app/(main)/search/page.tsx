import EmptyState from '@/components/feedback/EmptyState';
import UserSearchCard, {
  type SearchUser,
} from '@/components/search/UserSearchCard';

export default function SearchPage() {
  const users: SearchUser[] = [
    {
      _id: '1',
      username: 'Alex',
      bio: 'Backend Engineer | Node.js | AWS',
      profileImage: '',
      role: 'user',
      followersCount: 218,
      isFollowing: false,
    },
    {
      _id: '2',
      username: 'Rahul',
      bio: 'Frontend Developer | React | Next.js',
      profileImage: '',
      role: 'user',
      followersCount: 642,
      isFollowing: true,
    },
    {
      _id: '3',
      username: 'Admin',
      bio: 'Platform Administrator',
      profileImage: '',
      role: 'admin',
      followersCount: 1200,
      isFollowing: false,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Search Users</h1>

        <p className="mt-2 text-zinc-400">
          Find developers, creators and friends.
        </p>
      </div>

      {users.length === 0 ? (
        <EmptyState
          title="No Users Found"
          description="Try another keyword."
        />
      ) : (
        users.map((user) => (
          <UserSearchCard key={user._id} user={user} />
        ))
      )}
    </div>
  );
}