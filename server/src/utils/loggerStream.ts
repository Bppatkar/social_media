// centralized logger

import logger from '../config/logger.js';

const loggerStream = {
  write: (message: string) => {
    logger.http(message.trim()); // Trim the message to remove any extra newline characters
  },
};

export default loggerStream;
