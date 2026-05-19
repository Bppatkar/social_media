import type { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/ApiError.js';
import { logError } from '../utils/logger.util.js';

const errorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // default values
  let statusCode = 500;
  let message = 'Internal Server Error';

  // custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  logError(err.message, {
    stack: err.stack,
    path: _req.originalUrl,
    method: _req.method,
    requestId: _req.requestId,
  });

  res.status(statusCode).json({
    success: false,
    message,
    errors: err instanceof ApiError ? err.errors : undefined,
  });
};

export default errorMiddleware;
