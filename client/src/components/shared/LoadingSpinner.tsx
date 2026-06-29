'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return <Loader2 className={`animate-spin ${className}`} />;
}
