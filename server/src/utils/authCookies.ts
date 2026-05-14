import type { Response } from 'express';

import { clearTokenCookieOptions } from './cookieOptions.js';

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie('accessToken', accessToken, clearTokenCookieOptions);
  res.cookie('refreshToken', refreshToken, clearTokenCookieOptions);
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken', clearTokenCookieOptions);
  res.clearCookie('refreshToken', clearTokenCookieOptions);
};
