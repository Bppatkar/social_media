'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import UserAvatar from '@/components/shared/UserAvatar';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UserCardProps {
  username: string;
  profileImage?: string;
}

export default function UserCard({ username, profileImage }: UserCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Suggested User</h2>

        <ArrowRight className="h-5 w-5 text-zinc-500" />
      </div>

      <div className="flex items-center gap-4">
        <UserAvatar src={profileImage} alt={username} />

        <div className="flex-1">
          <h3 className="font-medium text-white">{username}</h3>

          <p className="text-sm text-zinc-500">@{username}</p>
        </div>

        <Button asChild size="sm" className="rounded-full">
          <Link href={`/profile`}>View</Link>
        </Button>
      </div>
    </Card>
  );
}
