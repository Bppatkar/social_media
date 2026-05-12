import type { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/ApiError.js';

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

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
