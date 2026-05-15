import type { Request } from 'express';

const extractAccessToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1] ?? null;
  }

  // optional cookies fallback or support
  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  return null;
};

export default extractAccessToken;
