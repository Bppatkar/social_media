import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  username: string;
}

const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '7d',
  });
};

export default generateToken;
