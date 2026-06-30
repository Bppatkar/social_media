import type { ReactNode } from 'react';

import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import BottomNavigation from '@/components/navigation/BottomNavigation';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-white">
      {/* Desktop Sidebar */}

      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-6">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}

      <BottomNavigation />
    </div>
  );
}
