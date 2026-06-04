import {connectRedis} from '../config/redis.js';
import {redisClient} from '../config/redis.js';

beforeAll(async () => {
  await connectRedis();
  console.log('Starting Test Suite...');
});

afterAll(async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
  console.log('Test Suite Completed.');
});