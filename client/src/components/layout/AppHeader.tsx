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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function AppHeader() {
  const handleMenuClick = () => {
    // Open mobile sidebar
  };

  const handleSearch = () => {
    // Search users and posts
  };

  const handleNotifications = () => {
    // Navigate to notifications page
  };

  const handleProfile = () => {
    // Navigate to profile page
  };

  const handleSettings = () => {
    // Navigate to settings page
  };

  const handleLogout = () => {
    // Logout user
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
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <Input
              placeholder="Search users or posts..."
              className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-violet-500/30"
              onChange={() => handleSearch()}
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Notifications */}

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={handleNotifications}
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ring-offset-background rounded-full transition outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-violet-600 text-white">
                    BP
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 border-white/10 bg-neutral-900 text-white"
            >
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleSettings}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
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
