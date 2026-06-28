'use client';

import type { ReactNode } from 'react';
import ReduxProvider from './ReduxProvider';

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
