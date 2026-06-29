import type { ReactNode } from 'react';

import AppLayout from '@/components/layout/AppLayout';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
