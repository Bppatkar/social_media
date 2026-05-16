import jwt, { type JwtPayload, type Secret } from 'jsonwebtoken';
import ApiError from './ApiError.js';
import env from '../config/env.js';

const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET as Secret);
    return decoded as JwtPayload;
    
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
};

export default verifyRefreshToken;
