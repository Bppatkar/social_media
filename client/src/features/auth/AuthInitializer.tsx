'use client';

import { ReactNode } from 'react';
import NotificationListener from '../notification/NotificationListener';

interface Props {
  children: ReactNode;
}

export default function AuthInitializer({ children }: Props) {
  return (
    <>
      <NotificationListener />
      {children}
    </>
  );
}
