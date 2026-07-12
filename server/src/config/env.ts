import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT || 8000,

  NODE_ENV: process.env.NODE_ENV || 'development',

  MONGO_URI: process.env.MONGO_URI || '',

  CLIENT_URL: process.env.CLIENT_URL! || 'http://localhost:3000',

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',

  REDIS_URL: process.env.REDIS_URL || '',

  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',

  CLOUD_API_KEY: process.env.CLOUDINARY_API_KEY || '',

  CLOUD_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};

export default env;
