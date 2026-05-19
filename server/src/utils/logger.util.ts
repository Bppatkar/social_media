import logger from '../config/logger.js';

interface LogMeta {
  requestId?: string;
  userId?: string;
  path?: string;
  method?: string;
  ip?: string;
  [key: string]: unknown;
}

export const logInfo = (message: string, meta?: LogMeta) => {
  logger.info(message, meta);
};

export const logError = (message: string, meta?: LogMeta) => {
  logger.error(message, meta);
};

export const logWarn = (message: string, meta?: LogMeta) => {
  logger.warn(message, meta);
};

export const logSecurityEvent = (
  message: string,
  meta?: LogMeta
) => {
  logger.log('security', message, meta);
};