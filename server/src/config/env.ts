import dotenv from 'dotenv';
dotenv.config();


const env = {
  PORT: process.env.PORT || 3000,

  NODE_ENV: process.env.NODE_ENV || 'development',

  MONGO_URI: process.env.MONGO_URI || '',

  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',

  REDIS_URL: process.env.REDIS_URL || '',
};

export default env;
