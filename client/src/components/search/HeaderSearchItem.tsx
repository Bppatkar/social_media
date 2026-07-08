'use client';

import Link from 'next/link';

import UserAvatar from '@/components/shared/UserAvatar';

import type { SearchUser } from '@/types';

interface Props {
  user: SearchUser;
  onSelect: () => void;
}

export default function HeaderSearchItem({ user, onSelect }: Props) {
  return (
    <Link
      href={`/profile/${user._id}`}
      onClick={onSelect}
      className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-white/5"
    >
      <UserAvatar src={user.profileImage} alt={user.username} />

      <div className="min-w-0">
        <p className="truncate font-medium text-white">{user.username}</p>

        {user.bio && (
          <p className="truncate text-xs text-zinc-400">{user.bio}</p>
        )}
      </div>
    </Link>
  );
}
