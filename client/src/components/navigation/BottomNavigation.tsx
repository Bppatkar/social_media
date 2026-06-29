'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { House, Search, SquarePen, Bell, User } from 'lucide-react';

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
  // Dummy active state for UI phase

  const pathname = usePathname();

  const handleNavigation = () => {
    // Navigate to selected page
  };

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
              onClick={handleNavigation}
              className={`flex flex-col items-center justify-center gap-1 transition ${
                isActive ? 'text-violet-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="h-6 w-6" />

              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
