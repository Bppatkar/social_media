'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { User } from '@/types';
import {
  selectUser,
  selectIsAuthenticated,
} from '@/features/auth/authSelectors';
import { setCredentials, logout } from '@/features/auth/authSlice';
import { useCallback, useMemo } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const login = useCallback(
    (user: User) => {
      dispatch(setCredentials({ user }));
    },
    [dispatch]
  );
  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout: signOut,
    }),
    [user, isAuthenticated, login, signOut]
  );
}
