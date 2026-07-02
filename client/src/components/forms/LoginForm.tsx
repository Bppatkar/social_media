'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '@/components/shared/SubmitButton';

import { useLoginMutation } from '@/features/auth/api/authApi';
import { getApiError } from '@/utils/getApiError';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginSchema } from '@/lib/validations/login.schema';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const [loginMutation, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      const response = await loginMutation(values).unwrap();
      login(response.data.user, response.data.token);
      toast.success(response.message);
      router.replace('/feed');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full rounded-3xl border border-white/10 bg-white/6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <CardContent className="space-y-6 px-6 py-8 sm:px-8 sm:py-9">
          {/* Heading */}

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome Back
            </h1>

            <p className="text-sm text-zinc-400">
              Sign in to continue your journey.
            </p>
          </div>

          {/* email */}
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
                type="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="john@example.com"
                {...register('email')}
                className="h-12 border-white/10 bg-white/5 pl-10 text-white transition-all placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/30"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}

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
                autoComplete="current-password"
                autoCorrect="off"
                spellCheck={false}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                className="h-12 border-white/10 bg-white/5 pl-10 text-white transition-all placeholder:text-zinc-500 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/30"
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login */}

          <SubmitButton type="submit" loading={isLoading}>
            Continue
          </SubmitButton>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-transparent px-3 text-[11px] tracking-wider text-zinc-500 uppercase">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register */}

          <Button
            asChild
            variant="outline"
            className="h-12 w-full border-white/15 bg-transparent text-white hover:border-white/30 hover:bg-white/8"
          >
            <Link href="/register">Create Account</Link>
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
