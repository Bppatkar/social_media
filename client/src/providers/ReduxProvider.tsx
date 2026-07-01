'use client';

import type { ReactNode } from 'react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

type ReduxProviderProps = {
  children: ReactNode;
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
