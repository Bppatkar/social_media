'use client';
import { useAppDispatch } from '@/store/hooks';
import { ReactNode, useEffect } from 'react';
import { authStorage } from './authStorage';
import { setCredentials } from './authSlice';
import { useMeQuery } from './api/authApi';

interface Props {
  children: ReactNode;
}

export default function AuthInitializer({ children }: Props) {
  const dispatch = useAppDispatch();

  const token = authStorage.getToken();
  const { data } = useMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.data.user && token) {
      dispatch(setCredentials({ user: data.data.user, token }));
    }
  }, [data, token, dispatch]);
  return children;
}
