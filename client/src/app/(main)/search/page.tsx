"use client";

import UserCard from '@/components/search/UserCard';
import SearchBar from '@/components/search/SearchBar';
import EmptyState from '@/components/feedback/EmptyState';

import type { SearchUser } from '@/components/search/UserCard';

export default function SearchPage() {
  const users: SearchUser[] = [
    {
      _id: '1',
      username: 'Bhanu',
      email: 'bhanu@gmail.com',
      bio: 'Full Stack Developer • MERN • Next.js',
      profileImage: '',
      followersCount: 210,
      isFollowing: false,
    },
    {
      _id: '2',
      username: 'Alex',
      email: 'alex@gmail.com',
      bio: 'Backend Engineer • Node.js • AWS',
      profileImage: '',
      followersCount: 540,
      isFollowing: true,
    },
    {
      _id: '3',
      username: 'Sarah',
      email: 'sarah@gmail.com',
      bio: 'Frontend Developer • React • UI/UX',
      profileImage: '',
      followersCount: 410,
      isFollowing: false,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Search</h1>

        <p className="mt-2 text-zinc-400">Find people and discover creators.</p>
      </div>

      <SearchBar />

      {users.length === 0 ? (
        <EmptyState
          title="No Users Found"
          description="Try another username."
        />
      ) : (
        <div className="space-y-5">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
