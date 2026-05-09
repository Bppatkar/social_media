import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): any => {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({
      message: 'Authorization header missing',
    });
  }
  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Token missing',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};
