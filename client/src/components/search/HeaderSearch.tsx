'use client';

import { useEffect, useRef, useState } from 'react';

import { Search } from 'lucide-react';

import HeaderSearchItem from './HeaderSearchItem';

import { Input } from '@/components/ui/input';

import { useSearchUsersQuery } from '@/features/search/searchApi';

import { useDebounce } from '@/hooks/useDebounce';

export default function HeaderSearch() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');

  const [open, setOpen] = useState(false);

  const debounced = useDebounce(query, 400);

  const { data } = useSearchUsersQuery(debounced, {
    skip: debounced.trim().length < 2,
  });

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutside);

    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    if (debounced.trim().length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [debounced]);

  return (
    <div ref={wrapperRef} className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-zinc-500"
      />

      {open && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-white/10 bg-neutral-900 p-2 shadow-2xl">
          {data?.users.length ? (
            data.users.map((user) => (
              <HeaderSearchItem
                key={user._id}
                user={user}
                onSelect={() => {
                  setOpen(false);
                  setQuery('');
                }}
              />
            ))
          ) : (
            <p className="p-4 text-center text-sm text-zinc-400">
              No users found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
