import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import { getCache, setCache, deleteCache } from './redis.service.js';
import { logInfo } from '../utils/logger.util.js';

const FEED_CACHE_KEY = 'feed:global';

export const getGlobalFeedService = async () => {
  //1. check redis firstly and return if exists

  const cachedFeed = await getCache(FEED_CACHE_KEY);

  if (cachedFeed) {
    logInfo('Serving FEED from Redis cache');
    return cachedFeed;
  }

  // 2. if not in cache, fetch from database
  const posts = await Post.find()
    .populate('owner', 'username profileImage')
    .sort({ createdAt: -1 })
    .limit(20);

  //3. store in redis cache for future requests
  await setCache(FEED_CACHE_KEY, posts, 60);
  logInfo('Serving FEED from database and caching in Redis');
  return posts;
};

export const invalidateFeedCacheService = async () => {
  await deleteCache(FEED_CACHE_KEY);
};

export const getCursorFeedService = async (
  cursor?: string,
  limit: number = 10
) => {
  const query = cursor
    ? {
        _id: {
          $lt: new mongoose.Types.ObjectId(cursor),
        },
      }
    : {};

  const posts = await Post.find(query)
    .populate('owner', 'username profileImage')
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean(); // lean() returns plain JavaScript objects instead of Mongoose documents, which can be more efficient for read operations

  const hasMore = posts.length > limit;

  // if there are more posts than the limit, we have a next page
  if (hasMore) posts.pop();

  const nextCursor =
    posts.length > 0 ? posts[posts.length - 1]?._id.toString() : null;

  return {
    posts,
    nextCursor,
    hasMore,
  };
};
