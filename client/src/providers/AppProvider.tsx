'use client';

import type { ReactNode } from 'react';
import ReduxProvider from './ReduxProvider';
import AuthInitializer from '@/features/auth/AuthInitializer';

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ReduxProvider>
      <AuthInitializer>{children}</AuthInitializer>
    </ReduxProvider>
  );
}
