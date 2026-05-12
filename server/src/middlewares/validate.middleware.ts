import type { Request, Response, NextFunction } from 'express';

import type { ZodType } from 'zod';
import { ZodError } from 'zod';

const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation Error',

          errors: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
};

export default validate;
