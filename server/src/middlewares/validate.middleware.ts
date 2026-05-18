import type { Request, Response, NextFunction } from 'express';

import type { ZodType } from 'zod';
import { ZodError } from 'zod';

import ApiError from '../utils/ApiError.js';
import formatZodError from '../utils/formatZodError.js';

const validate = (schema: ZodType) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return next(
          new ApiError(400, 'Validation Error', formatZodError(error))
        );
      }

      next(error);
    }
  };
};

export default validate;
