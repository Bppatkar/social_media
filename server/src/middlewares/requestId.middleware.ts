import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const requestIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const requestId = `req_${crypto.randomUUID()}`;
  req.requestId = requestId;
  next();
};
