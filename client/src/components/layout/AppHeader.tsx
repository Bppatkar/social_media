'use client';

import Link from 'next/link';
import { Bell, Menu, Search, Settings, User, LogOut } from 'lucide-react';

import Logo from '@/components/shared/Logo';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const { data: unread } = useGetUnreadCountQuery();

  const handleMenuClick = () => {
    dispatch(openMobileSidebar());
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      toast.success('Logged out successfully');
      router.replace('/login');
    } catch (error) {
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
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop */}

          <div className="hidden md:block" />

          {/* Mobile */}

          <Link href="/feed" className="md:hidden">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/10"
              >
                <Bell className="h-5 w-5" />

                {(unread?.count ?? 0) > 0 && (
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
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.profileImage} />

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
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 focus:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
