'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import HeaderSearchItem from './HeaderSearchItem';
import { Input } from '@/components/ui/input';
import { useSearchUsersQuery } from '@/features/search/searchApi';
import { useDebounce } from '@/hooks/useDebounce';

export default function HeaderSearch() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debounced = useDebounce(query, 400);
  const { data, isLoading, isError } = useSearchUsersQuery(debounced, {
    skip: debounced.trim().length < 2,
  });

  const users = data?.users ?? [];

  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', outside);

    return () => document.removeEventListener('mousedown', outside);
  }, []);

  useEffect(() => {
    setOpen(debounced.trim().length >= 2);
    setSelectedIndex(0);
  }, [debounced]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    switch (e.key) {
      case 'Escape':
        setOpen(false);
        break;

      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, users.length - 1));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;

      case 'Enter':
        if (!users[selectedIndex]) return;

        router.push(`/profile/${users[selectedIndex]._id}`);

        setOpen(false);
        setQuery('');
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search users..."
        className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-zinc-500"
      />

      {open && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-xl border border-white/10 bg-neutral-900 p-2 shadow-2xl">
          {isLoading && (
            <p className="p-4 text-center text-sm text-zinc-400">
              Searching...
            </p>
          )}

          {isError && (
            <p className="p-4 text-center text-sm text-red-400">
              Search failed
            </p>
          )}

          {!isLoading && !isError && users.length === 0 && (
            <p className="p-4 text-center text-sm text-zinc-400">
              No users found
            </p>
          )}

          {!isLoading &&
            users.map((user, index) => (
              <HeaderSearchItem
                key={user._id}
                user={user}
                selected={selectedIndex === index}
                onSelect={() => {
                  setOpen(false);
                  setQuery('');
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}
