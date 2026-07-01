'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-500" />

      <Input
        value={value}
        placeholder="Search users..."
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-full border-white/10 bg-white/5 pl-12 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
      />
    </div>
  );
}
