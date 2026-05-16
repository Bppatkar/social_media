import env from './env.js';

const requiredEnvVariables = [
  'MONGO_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
];

requiredEnvVariables.forEach((key) => {
  if (!env[key as keyof typeof env]) {
    throw new Error(` Missing environment variable: ${key}`);
  }
});

