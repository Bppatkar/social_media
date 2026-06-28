import type { ReactNode } from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import BottomNavigation from '../navigation/BottomNavigation';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <BottomNavigation />
      </div>
    </div>
  );
}
