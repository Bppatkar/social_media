// morgan only for - HTTP Request logger [GET /api/posts 200 15ms]
// winston for full logging capabilities (info, error, debug, etc.) with timestamps and formatting

/* 
example of winston log output:
[2024-06-01T12:00:00.000Z] INFO: Server is running on port http://localhost:3000
[2024-06-01T12:01:00.000Z] ERROR: Database connection failed: Connection refused

//* why enterprise app use both..?
because morgan lightweight hai , winston full featured hai, morgan sirf HTTP request logging ke liye use hota hai, jabki winston application ke har tarah ke logs ke liye use hota hai, jaise ki info, error, debug, etc.
*/

import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    return `[${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
  })
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: 'info',

  format: isProduction ? prodFormat : devFormat,

  defaultMeta: {
    service: 'social-media-backend',
  },

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

export default logger;
