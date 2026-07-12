'use client';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Button } from '@/components/ui/button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export default function SubmitButton({ loading, children, ...props }: Props) {
  return (
    <Button
      {...props}
      type={props.type ?? 'button'}
      disabled={loading || props.disabled}
      className={`h-12 w-full bg-linear-to-r from-violet-600 to-indigo-600 font-semibold ${props.className ?? ''}`}
    >
      {loading && (
        <Loader2 area-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}
