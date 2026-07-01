'use client';

import { useMemo, useState } from 'react';

import SearchBar from '@/components/search/SearchBar';
import UserCard from '@/components/search/UserCard';
import UserSearchCard, {
  type SearchUser,
} from '@/components/search/UserSearchCard';

import EmptyState from '@/components/feedback/EmptyState';
import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  // ==========================
  // Future RTK Query
  // ==========================
  //
  // const {
  //    data,
  //    isLoading,
  //    isError
  // } = useSearchUsersQuery(query)

  const isLoading = false;

  const isError = false;

  const users: SearchUser[] = [
    {
      _id: '1',
      username: 'Bhanu',
      email: 'bhanu@gmail.com',
      bio: 'Backend Developer | Next.js | AWS | Docker',
      followers: 221,
      isFollowing: false,
      role: 'user',
    },

    {
      _id: '2',
      username: 'Alex',
      email: 'alex@gmail.com',
      bio: 'Full Stack Engineer',
      followers: 96,
      isFollowing: true,
      role: 'admin',
    },

    {
      _id: '3',
      username: 'John',
      email: 'john@gmail.com',
      bio: 'Software Engineer',
      followers: 155,
      isFollowing: false,
      role: 'user',
    },
  ];

  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;

    return users.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState title="Search Failed" description="Please try again." />;
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
      {/* Search Result */}

      <section className="space-y-6 lg:col-span-8">
        <SearchBar value={query} onChange={setQuery} />

        {filteredUsers.length === 0 ? (
          <EmptyState
            title="No User Found"
            description="Try another username."
          />
        ) : (
          <div className="space-y-5">
            {filteredUsers.map((user) => (
              <UserSearchCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </section>

      {/* Right Sidebar */}

      <aside className="space-y-6 lg:col-span-4">
        <UserCard username="Bhanu" profileImage="" />

        <UserCard username="Alex" profileImage="" />

        <UserCard username="John" profileImage="" />
      </aside>
    </div>
  );
}
