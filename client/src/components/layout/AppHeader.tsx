'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Menu, Settings, User, LogOut, Shield } from 'lucide-react';

import Logo from '@/components/shared/Logo';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetUnreadCountQuery } from '@/features/notification/notificationApi';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useLogoutMutation } from '@/features/auth/api/authApi';
import { useMarkAllNotificationsAsReadMutation } from '@/features/notification/notificationApi';
import useCurrentUser from '@/hooks/useCurrentUser';
import { baseApi } from '@/services/api/baseApi';
import NotificationDropdown from '@/components/notification/NotificationDropdown';
import HeaderSearch from '@/components/search/HeaderSearch';
import { openMobileSidebar } from '@/features/ui/uiSlice';

export default function AppHeader() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();
  const { data: unread, refetch: refetchUnread } = useGetUnreadCountQuery();
  const [markAllRead] = useMarkAllNotificationsAsReadMutation();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleMenuClick = () => {
    dispatch(openMobileSidebar());
  };

  const handleNotificationOpenChange = async (open: boolean) => {
    setNotificationOpen(open);

    if (!open) return;

    try {
      await markAllRead().unwrap();
    } catch {
      // keep existing badge state if the request fails
    } finally {
      await refetchUnread();
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      toast.success('Logged out successfully');
      router.replace('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white md:hidden"
            onClick={handleMenuClick}
            aria-label="Open Navigation Menu"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </Button>

          {/* Desktop */}

          <div className="hidden md:block" />

          {/* Mobile */}

          <Link href="/feed" className="md:hidden" aria-label="Go to Feed">
            <Logo />
          </Link>
        </div>

        {/* Search */}
        <div className="hidden flex-1 md:block">
          <HeaderSearch />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Notifications */}

          <DropdownMenu onOpenChange={handleNotificationOpenChange}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/10"
                aria-label="Open Notifications"
              >
                <Bell aria-hidden="true" className="h-5 w-5" />

                {!notificationOpen && (unread?.count ?? 0) > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {unread!.count > 99 ? '99+' : unread!.count}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="max-h-137.5 w-105 overflow-hidden border border-white/10 bg-neutral-900 p-0"
            >
              <NotificationDropdown />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full p-0"
                aria-label="Open User Menu"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.profileImage} alt={user?.username} />

                  <AvatarFallback className="bg-violet-600 text-white">
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 border-white/10 bg-neutral-900 text-white"
            >
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User aria-hidden="true" className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              {user?.role === 'admin' && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <Shield aria-hidden="true" className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings aria-hidden="true" className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 focus:text-red-400"
              >
                <LogOut aria-hidden="true" className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
