import bcrypt from 'bcryptjs';

const hashToken = async (token: string): Promise<string> => {
  return bcrypt.hash(token, 10);
};

export default hashToken;
