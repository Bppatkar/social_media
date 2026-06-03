import type { Request } from 'express';
import { COOKIE_NAMES } from '../constants/auth.constants.js';

const extractAccessToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1] ?? null;
  }

  // optional cookies fallback or support
  if (req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN]) {
    return req.cookies[COOKIE_NAMES.ACCESS_TOKEN];
  }

  return null;
};

export default extractAccessToken;
