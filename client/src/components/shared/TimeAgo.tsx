'use client';

import { formatDistanceToNow } from 'date-fns';

interface TimeAgoProps {
  date: string;
}

export default function TimeAgo({ date }: TimeAgoProps) {
  return (
    <span className="text-sm text-zinc-400">
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })}
    </span>
  );
}
