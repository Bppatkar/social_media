import type { Request } from 'express';

export interface JwtUserPayload {
  userId: string;
  username: string;
}

export interface AuthRequest extends Request {
  user?: JwtUserPayload;
}

