import jwt from 'jsonwebtoken';
import env from '../config/env.js';

interface AccessTokenPayload {
  userId: string;
  username: string;
  role: 'user' | 'admin';
}

const generateAccessToken = (payload: AccessTokenPayload) => {
  const secret = env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error(
      'JWT_ACCESS_SECRET is not defined in environment variables'
    );
  }

  return jwt.sign(payload, secret, {
    expiresIn: '15m',
  });
};

export default generateAccessToken;
