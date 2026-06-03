import type { Response } from 'express';

import {
  refreshTokenCookieOptions,
  clearTokenCookieOptions,
  accessTokenCookieOptions,
} from './cookieOptions.js';

import {COOKIE_NAMES} from '../constants/auth.constants.js';

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, refreshTokenCookieOptions);
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, clearTokenCookieOptions);
  res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, clearTokenCookieOptions);
};

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
};
