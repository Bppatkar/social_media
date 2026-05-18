import type { ZodError } from 'zod';

const formatZodError = (error: ZodError) => {
  return error.issues.map((err)=>({
    field: err.path.join('.'),
    message: err.message
  }))
};

export default formatZodError;
