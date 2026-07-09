import type { ReactNode } from 'react';

import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <AppLayout>
      <ProtectedRoute>{children}</ProtectedRoute>
    </AppLayout>
  );
}
