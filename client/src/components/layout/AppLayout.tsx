import type { ReactNode } from 'react';

import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import BottomNavigation from '@/components/navigation/BottomNavigation';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      {/* Desktop Sidebar */}

      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main>{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}

      <BottomNavigation />
    </div>
  );
}
