'use client';

import { Inbox } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-16 text-center">
      <div className="mb-5 rounded-full bg-violet-500/10 p-4">
        <Inbox className="h-10 w-10 text-violet-400" />
      </div>

      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <p className="mt-3 max-w-md text-zinc-400">{description}</p>

      {buttonText && (
        <Button
          onClick={onAction}
          className="mt-8 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-8"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
