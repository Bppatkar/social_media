import RefreshToken from '../models/RefreshToken.model.js';
import compareToken from './compareToken.js';

const findRefreshTokenSession = async (refreshToken: string) => {
  // get all non - expired refresh tokens

  const sessions = await RefreshToken.find({ isRevoked: false });

  // compare incoming token with hashed tokens in DB

  for (const session of sessions) {
    const isMatch = await compareToken(refreshToken, session.token);

    if (isMatch) {
      return session;
    }
  }

  return null;
};

export default findRefreshTokenSession;
