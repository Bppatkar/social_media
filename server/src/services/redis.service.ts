import { redisClient } from '../config/redis.js';

export const setCache = async (
  key: string,
  value: unknown,
  ttlInSeconds?: number
) => {
  if (!redisClient.isOpen) {
    return;
  }
  const serializedValue = JSON.stringify(value);

  if (ttlInSeconds) {
    await redisClient.setEx(key, ttlInSeconds, serializedValue);
    return;
  }

  await redisClient.set(key, serializedValue);
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  if (!redisClient.isOpen) {
    return null;
  }
  const data = await redisClient.get(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as T;
};

export const deleteCache = async (key: string) => {
  if (!redisClient.isOpen) {
    return;
  }
  await redisClient.del(key);
};
