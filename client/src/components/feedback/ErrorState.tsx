'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Unable to load data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-16 text-center">
      <div className="mb-5 rounded-full bg-red-500/10 p-4">
        <AlertTriangle className="h-10 w-10 text-red-400" />
      </div>

      <h2 className="text-2xl font-semibold text-zinc-300">{title}</h2>

      <p className="mt-3 max-w-md text-zinc-400">{description}</p>

      {onRetry && (
        <Button onClick={onRetry} className="mt-8 rounded-full">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  );
}
