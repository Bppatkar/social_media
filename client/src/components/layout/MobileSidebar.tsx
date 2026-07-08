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
  X,
} from 'lucide-react';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import UserAvatar from '@/components/shared/UserAvatar';

import useCurrentUser from '@/hooks/useCurrentUser';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { closeMobileSidebar } from '@/features/ui/uiSlice';
import { selectMobileSidebarOpen } from '@/features/ui/uiSelectors';

import { useLogoutMutation } from '@/features/auth/api/authApi';
import { logout } from '@/features/auth/authSlice';
import { baseApi } from '@/services/api/baseApi';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function MobileSidebar() {
  const { user } = useCurrentUser();

  const open = useAppSelector(selectMobileSidebarOpen);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [logoutApi] = useLogoutMutation();

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

  const close = () => dispatch(closeMobileSidebar());

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();

      dispatch(logout());

      dispatch(baseApi.util.resetApiState());

      close();

      toast.success('Logged out successfully');

      router.replace('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side="left" className="w-72 border-white/10 bg-neutral-950">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar src={user?.profileImage} alt={user?.username} />

            <div>
              <p className="font-semibold text-white">{user?.username}</p>

              <p className="text-xs text-zinc-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} onClick={close}>
                <Button
                  variant="ghost"
                  className="h-12 w-full justify-start gap-3 rounded-xl"
                >
                  <Icon className="h-5 w-5" />

                  {item.label}
                </Button>
              </Link>
            );
          })}

          {user?.role === 'admin' && (
            <Link href="/admin" onClick={close}>
              <Button
                variant="ghost"
                className="h-12 w-full justify-start gap-3 rounded-xl"
              >
                <Shield className="h-5 w-5" />
                Admin
              </Button>
            </Link>
          )}
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="mt-10 w-full justify-start gap-3 text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </SheetContent>
    </Sheet>
  );
}
