import jwt from 'jsonwebtoken';

interface AccessTokenPayload {
  userId: string;
  username: string;
}

const generateAccessToken = (payload: AccessTokenPayload) => {
  const secret = process.env.JWT_ACCESS_SECRET;

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
