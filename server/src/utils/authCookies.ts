import type { Response } from 'express';

import {
  refreshTokenCookieOptions,
  clearTokenCookieOptions,
} from './cookieOptions.js';

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
) => {
  res.cookie(
    'refreshToken',
    refreshToken,
    refreshTokenCookieOptions
  );
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(
    'refreshToken',
    clearTokenCookieOptions
  );
};