'use client';

import { useState } from 'react';

import SearchBar from '@/components/search/SearchBar';
import UserCard from '@/components/search/UserCard';
import UserSearchCard from '@/components/search/UserSearchCard';
import { useSearchUsersQuery } from '@/features/search/searchApi';

import EmptyState from '@/components/feedback/EmptyState';
import ErrorState from '@/components/feedback/ErrorState';
import LoadingState from '@/components/feedback/LoadingState';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, isError } = useSearchUsersQuery(debouncedQuery, {
    skip: debouncedQuery.trim().length < 2,
  });

  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
      {/* Search Result */}

      <section className="space-y-6 lg:col-span-8">
        <SearchBar value={query} onChange={setQuery} />

        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState title="Search Failed" description="Please try again." />
        ) : debouncedQuery.trim().length >= 2 &&
          data &&
          data.users.length === 0 ? (
          <EmptyState
            title="No User Found"
            description="Try another username."
          />
        ) : (
          <div className="space-y-5">
            {data?.users?.map((user) => (
              <UserSearchCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </section>

      {/* Right Sidebar */}

      <aside className="space-y-6 lg:col-span-4">
        <EmptyState title="Suggestions" description="Suggested users will appear here." />
      </aside>
    </div>
  );
}
