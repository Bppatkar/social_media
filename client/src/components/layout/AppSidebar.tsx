'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  LogOut,
  Search,
  Settings,
  Shield,
  User,
} from 'lucide-react';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';
import UserAvatar from '@/components/shared/UserAvatar';
import { useGetUnreadCountQuery } from '@/features/notification/notificationApi';
import { cn } from '@/lib/utils';

export default function AppSidebar() {
  const pathname = usePathname();
  const adminActive = pathname.startsWith('/admin');

  const { data: unread } = useGetUnreadCountQuery();

  const navigation = [
    {
      label: 'Feed',
      href: '/feed',
      icon: Home,
    },
    {
      label: 'Search',
      href: '/search',
      icon: Search,
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
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-white/10 bg-neutral-950 lg:flex lg:flex-col">
      {/* Logo */}

      <div className="shrink-0 border-t border-white/10 p-4">
        <Logo />
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          // Future
          // const active = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'mb-1 flex h-12 w-full items-center justify-between rounded-xl',
                  active
                    ? 'bg-violet-600 text-white'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  {item.label}
                </div>

                {item.label === 'Notifications' && (unread?.count ?? 0) > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                    {unread!.count > 99 ? '99+' : unread!.count}
                  </span>
                )}
              </Button>
            </Link>
          );
        })}
        {/* Admin Link */}
        {/* Future */}
        {/* Show only if logged user is Admin */}
        <Link href="/admin">
          <Button
            variant="ghost"
            className={cn(
              'mt-4 flex h-12 w-full justify-start gap-3 rounded-xl',
              adminActive
                ? 'bg-violet-600 text-white'
                : 'text-zinc-300 hover:bg-white/5 hover:text-white'
            )}
          >
            <Shield className="h-5 w-5" />
            Admin
          </Button>
        </Link>
      </nav>

      {/* Bottom */}

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <UserAvatar />

          <div className="min-w-0 flex-1">
            {/* Future */}

            <p className="truncate text-sm font-semibold text-white">
              Username
            </p>

            <p className="truncate text-xs text-zinc-400">email@example.com</p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="flex h-11 w-full justify-start gap-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>

        {/* Future */}

        {/* Logout RTK Mutation */}
        {/* Clear Redux */}
        {/* Remove Tokens */}
        {/* Redirect Login */}
      </div>
    </aside>
  );
}
