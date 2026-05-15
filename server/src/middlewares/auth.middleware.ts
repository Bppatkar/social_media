import type { Response, NextFunction } from 'express';
import type { AuthRequest, JwtUserPayload } from '../types/auth.types.js';
import verifyAccessToken from '../utils/verifyAccessToken.js';
import ApiError from '../utils/ApiError.js';
import extractAccessToken from '../utils/extractAccessToken.js';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = extractAccessToken(req);

  if (!token) {
    throw new ApiError(401, 'No token provided');
  }

  const decoded = verifyAccessToken(token);

  req.user = decoded as JwtUserPayload;
  next();
};
