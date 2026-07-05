'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { House, Search, SquarePen, Bell, User } from 'lucide-react';
import { useGetUnreadCountQuery } from '@/features/notification/notificationApi';

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navigationItems: NavItem[] = [
  {
    label: 'Home',
    href: '/feed',
    icon: House,
  },
  {
    label: 'Search',
    href: '/search',
    icon: Search,
  },
  {
    label: 'Create',
    href: '#',
    icon: SquarePen,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
];

export default function BottomNavigation() {
  const { data: unread } = useGetUnreadCountQuery();

  const pathname = usePathname();

  const handleCreatePost = () => {
    // Open Create Post dialog
  };

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-neutral-950/90 backdrop-blur-xl lg:hidden">
      <div className="grid h-16 grid-cols-5">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          if (item.label === 'Create') {
            return (
              <button
                key={item.label}
                type="button"
                onClick={handleCreatePost}
                className="flex flex-col items-center justify-center gap-1 text-zinc-400 transition hover:text-white"
              >
                <Icon className="h-6 w-6" />

                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition ${
                isActive ? 'text-violet-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />

                {item.label === 'Notifications' && (unread?.count ?? 0) > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">
                    {unread!.count > 9 ? '9+' : unread!.count}
                  </span>
                )}
              </div>

              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
