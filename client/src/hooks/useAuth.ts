'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { User } from '@/types';
import {
  selectUser,
  selectIsAuthenticated,
} from '@/features/auth/authSelectors';
import { setCredentials, logout } from '@/features/auth/authSlice';
import { useMemo } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const login = (user: User) => {
    dispatch(setCredentials({ user }));
  };
  const signOut = () => {
    dispatch(logout());
  };

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout: signOut,
    }),
    [user, isAuthenticated]
  );
}
