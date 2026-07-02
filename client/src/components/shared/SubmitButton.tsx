'use client';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export default function SubmitButton({ loading, children, ...props }: Props) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      className="h-12 w-full bg-linear-to-r from-violet-600 to-indigo-600 font-semibold"
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
