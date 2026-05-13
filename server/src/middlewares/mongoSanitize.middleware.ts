import type { Request, Response, NextFunction } from 'express';

const sanitize = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj;

  for (const key in obj) {
    // remove dangerous mongo operators
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
      continue;
    }

    if (typeof obj[key] === 'object') {
      sanitize(obj[key]);
    }
  }

  return obj;
};

const mongoSanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sanitize(req.body);
  sanitize(req.params);
  sanitize(req.query);

  next();
};

export default mongoSanitizeMiddleware;