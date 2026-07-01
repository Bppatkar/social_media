'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { User } from '@/types/user.types';
import {
  selectUser,
  selectToken,
  selectIsAuthenticated,
} from '@/features/auth/authSelectors';
import { authStorage } from '@/features/auth/authStorage';
import { setCredentials, logout } from '@/features/auth/authSlice';
import { useMemo } from 'react';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const login = (user: User, token: string) => {
    authStorage.setToken(token);
    dispatch(setCredentials({ user, token }));
  };
  const signOut = () => {
    authStorage.removeToken();
    dispatch(logout());
  };

  return useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      login,
      logout: signOut,
    }),
    [user, token, isAuthenticated]
  );
}
