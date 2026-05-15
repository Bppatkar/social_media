import jwt, { type JwtPayload, type Secret } from 'jsonwebtoken';
import ApiError from './ApiError.js';

const verifyAccessToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret);
    return decoded as JwtPayload;
  } catch (error) {
    throw new ApiError(401, 'Invalid access token');
  }
};

export default verifyAccessToken;
