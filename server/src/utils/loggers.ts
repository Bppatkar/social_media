import logger from '../config/logger.js';

export const loggerInfo = (message: string, meta?: Record<string, unknown>) => {
  logger.info(message, meta);
};

export const logError = (message: string, meta?: Record<string, unknown>) => {
  logger.error(message, meta);
};

export const logWarn = (message: string, meta?: Record<string, unknown>) => {
  logger.warn(message, meta);
};

export const logSecurity = (
  message: string,
  meta?: Record<string, unknown>
) => {
  logger.warn(message, {
    type: 'SECURITY',
    ...meta,
  });
};
