'use client';

import { useState } from 'react';
import { AtSign, Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    // Step 1 -> Get validated form values
    // Step 2 -> Validate password & confirm password
    // Step 3 -> Call Register RTK Query mutation
    // Step 4 -> Show success toast
    // Step 5 -> Redirect to Login
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Card className="w-full rounded-3xl border border-white/10 bg-white/6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <CardContent className="space-y-6 px-6 py-8 sm:px-8 sm:py-9">
          {/* Heading */}

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Create Account
            </h1>

            <p className="text-sm text-zinc-400">
              Join SocialSphere and start connecting.
            </p>
          </div>

          {/* Username */}

          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="text-sm font-medium text-zinc-300"
            >
              Username
            </Label>

            <div className="relative">
              <AtSign
                aria-hidden="true"
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
              />

              <Input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="john_doe"
                className="h-12 border-white/10 bg-white/5 pl-10 text-white transition-all placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/30"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-zinc-300"
            >
              Email
            </Label>

            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
              />

              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="john@example.com"
                className="h-12 border-white/10 bg-white/5 pl-10 text-white transition-all placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/30"
              />
            </div>
          </div>

          {/* Password */}

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </Label>

            <div className="relative">
              <Lock
                aria-hidden="true"
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
              />

              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                autoCorrect="off"
                spellCheck={false}
                placeholder="••••••••"
                className="h-12 border-white/10 bg-white/5 pr-12 pl-10 text-white transition-all placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/30"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-zinc-300"
            >
              Confirm Password
            </Label>

            <div className="relative">
              <Lock
                aria-hidden="true"
                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                autoCorrect="off"
                spellCheck={false}
                placeholder="••••••••"
                className="h-12 border-white/10 bg-white/5 pr-12 pl-10 text-white transition-all placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/30"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
                aria-pressed={showConfirmPassword}
                className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="h-12 w-full bg-linear-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-600/20 transition-[transform,box-shadow,filter] duration-300 hover:scale-[1.01] hover:shadow-violet-600/40 hover:brightness-110 active:scale-[0.99]"
          >
            Create Account
          </Button>

          {/* Divider */}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-transparent px-3 text-[11px] tracking-wider text-zinc-500 uppercase">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login */}

          <Button
            asChild
            variant="outline"
            className="h-12 w-full border-white/15 bg-transparent text-white hover:border-white/30 hover:bg-white/8"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
