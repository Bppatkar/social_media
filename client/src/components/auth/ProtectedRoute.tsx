'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCredentials } from '@/features/auth/authSlice';
import { useGetMeQuery } from '@/features/auth/api/authApi';
import { useAppDispatch } from '@/store/hooks';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, error, isLoading, isSuccess } = useGetMeQuery();

  const status =
    typeof error === 'object' && error && 'status' in error
      ? (error as { status?: number }).status
      : undefined;
  const unauthorized = status === 401;

  useEffect(() => {
    if (unauthorized) {
      router.replace('/login');
    }
  }, [router, unauthorized]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data }));
    }
  }, [data, dispatch, isSuccess]);

  if (isLoading || unauthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
