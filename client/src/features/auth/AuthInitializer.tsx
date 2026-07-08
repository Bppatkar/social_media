'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthInitializer({ children }: Props) {
  return <>{children}</>;
}
