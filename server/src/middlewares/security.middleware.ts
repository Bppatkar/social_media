import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitizeMiddleware from '../middlewares/mongoSanitize.middleware.js';
import hpp from 'hpp';

import type { Express } from 'express';

export const applySecurityMiddlewares = (app: Express) => {
  // Helment -> secure HTTP Headers
  app.use(helmet());

  // Rate Limiting -> limit repeated requests to public APIs and endpoints
  // example = 100 requests per 15 minutes

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      message:
        'Too many requests from this IP, please try again after 15 minutes',
    },
  });

  app.use(limiter);

  // prevent MONGODB INJECTION attacks
  // example = { "username": { "$gt": "" } }
  app.use(mongoSanitizeMiddleware);

  // prevent HTTP Parameter Pollution attacks
  // example = /search?name=John&name=Jane -> only the last one will be considered
  app.use(hpp());
};
