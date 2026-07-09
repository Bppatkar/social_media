'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';
import { useGetMeQuery } from '@/features/auth/api/authApi';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, error, isLoading, isSuccess } = useGetMeQuery();

  useEffect(() => {
    const status =
      typeof error === 'object' && error && 'status' in error
        ? (error as { status?: number }).status
        : undefined;

    if (status === 401) {
      router.replace('/login');
    }
  }, [error, router]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data }));
    }
  }, [data, dispatch, isSuccess]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
