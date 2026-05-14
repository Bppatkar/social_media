import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest, JwtUserPayload } from '../types/auth.types.js';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): any => {
  const token =
    req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Token missing',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

    req.user = decoded as JwtUserPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
