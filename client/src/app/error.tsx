'use client';

import { useEffect } from 'react';

import ErrorState from '@/components/feedback/ErrorState';

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <ErrorState
        title="Something went wrong"
        description="An unexpected error occurred. Please try again."
        onRetry={reset}
      />
    </main>
  );
}
