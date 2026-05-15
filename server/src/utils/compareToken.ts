import bcrypt from 'bcryptjs';

const compareToken = async (
  token: string,
  hashedToken: string
): Promise<boolean> => {
  return bcrypt.compare(token, hashedToken);
};

export default compareToken;
