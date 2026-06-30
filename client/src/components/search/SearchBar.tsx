'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const handleSearch = (query: string) => {
    setQuery(query);
    // future
    // Debounce search
    // RTK Query Search Users
    // RTK Query Search Posts
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />

      <Input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search users, posts..."
        className="h-12 rounded-xl border-white/10 bg-white/5 pr-12 pl-12 text-white placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-violet-500"
      />

      {query.length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
