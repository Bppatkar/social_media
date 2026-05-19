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

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),

  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    return `[${timestamp}] ${level}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({
    stack: true,
  }),
  winston.format.json()
);

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    security: 2,
    audit: 3,
    info: 4,
    http: 5,
    debug: 6,
  },
};

winston.addColors({
  error: 'red',
  warn: 'yellow',
  security: 'magenta',
  audit: 'cyan',
  info: 'green',
  http: 'blue',
  debug: 'white',
});

const logger = winston.createLogger({
  levels: customLevels.levels,

  defaultMeta: {
    service: 'social-media-backend',
  },

  transports: [
    // console
    new winston.transports.Console({
      format: isProduction ? fileFormat : consoleFormat,
    }),

    // all logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: fileFormat,
    }),

    // errors only
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: fileFormat,
    }),

    new winston.transports.File({
      filename: 'logs/security.log',
      format: winston.format.combine(
        winston.format((info) => {
          return info.level === 'security' ? info : false;
        })(),

        fileFormat
      ),
    }),

    new winston.transports.File({
      filename: 'logs/audit.log',

      format: winston.format.combine(
        winston.format((info) => {
          return info.level === 'audit' ? info : false;
        })(),

        fileFormat
      ),
    }),
  ],
});

export default logger;
