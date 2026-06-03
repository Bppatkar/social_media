import type { Response, NextFunction, Request } from 'express';
import type {  JwtUserPayload } from '../types/auth.types.js';
import verifyAccessToken from '../utils/verifyAccessToken.js';
import ApiError from '../utils/ApiError.js';
import extractAccessToken from '../utils/extractAccessToken.js';

export const authMiddleware = (
  req: Request,
  _res: Response,
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
