import type { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/ApiError.js';
import { STATUS_CODES } from 'node:http';

const errorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // default values
  let statusCode = 500;
  let message = 'Internal Server Error';

  // custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
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
