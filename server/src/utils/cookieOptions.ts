import type { CookieOptions } from 'express';
import env from '../config/env.js';
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from '../constants/auth.constants.js';

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production', // Set secure flag in production
  sameSite: 'lax',
  maxAge: REFRESH_TOKEN_EXPIRY,
};

export const clearTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production', // Set secure flag in production
  // sameSite: 'strict', // strict can cause issues with cookie clearing in some browsers, so we use lax for clearing cookies
  sameSite: 'lax', // lax used in production to allow cross-site cookie clearing during logout
  maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
};

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production', // Set secure flag in production
  sameSite: 'lax',
  maxAge: ACCESS_TOKEN_EXPIRY,
};
