import jwt, {
  TokenExpiredError,
  type JwtPayload,
  type Secret,
} from 'jsonwebtoken';
import ApiError from './ApiError.js';
import env from '../config/env.js';

const verifyAccessToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET as Secret);
    return decoded as JwtPayload;
  } catch (error) {
    // token expired
    if (error instanceof TokenExpiredError) {
      throw new ApiError(401, 'Access token expired');
    }
    // invalid token
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, 'Invalid access token');
    }
    throw new ApiError(401, 'Authentication failed');
  }
};

export default verifyAccessToken;
