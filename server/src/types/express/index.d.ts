import type { JwtUserPayload } from '../auth.types.js';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      user?: JwtUserPayload;
    }
  }
}

export {};