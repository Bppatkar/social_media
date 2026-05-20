import { createClient } from 'redis';
import env from './env.js';

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Failed to connect Redis', error);
  }
};

export { redisClient, connectRedis };
