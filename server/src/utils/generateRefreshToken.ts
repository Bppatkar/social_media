import jwt from 'jsonwebtoken';
import env from '../config/env.js';

interface RefreshTokenPayload {
  userId: string;
}

const generateRefreshToken = (payload: RefreshTokenPayload) => {
  const secret = env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }

  return jwt.sign(payload, secret, {
    expiresIn: '7d',
  });
};

export default generateRefreshToken;
