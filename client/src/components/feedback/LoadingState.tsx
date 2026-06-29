'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface LoadingStateProps {
  text?: string;
}

export default function LoadingState({
  text = 'Loading...',
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner className="h-10 w-10 text-violet-500" />

      <p className="mt-5 text-zinc-400">{text}</p>
    </div>
  );
}
