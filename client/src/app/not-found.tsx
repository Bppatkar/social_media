import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Button asChild>
        <Link href="/feed">Go to Feed</Link>
      </Button>
    </main>
  );
}
