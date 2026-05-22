import type { Request } from 'express';

export interface JwtUserPayload {
  userId: string;
  username: string;
  role: 'user' | 'admin';
}

export interface AuthRequest extends Request {
  user?: JwtUserPayload;
}