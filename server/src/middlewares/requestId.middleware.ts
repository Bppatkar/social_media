import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

 export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = crypto.randomUUID();
  req.requestId = requestId;
  next();
};


