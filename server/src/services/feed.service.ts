import Post from '../models/post.model.js';
import { getCache, setCache, deleteCache } from './redis.service.js';

const FEED_CACHE_KEY = 'feed:global';

export const getGlobalFeedService = async () => {
  //1. check redis firstly and return if exists

  const cachedFeed = await getCache(FEED_CACHE_KEY);

  if (cachedFeed) {
    console.log('Serving FEED from Redis cache');
    return cachedFeed;
  }

  // 2. if not in cache, fetch from database
  const posts = await Post.find()
    .populate('owner', 'username email')
    .sort({ createdAt: -1 })
    .limit(20);

  //3. store in redis cache for future requests
  await setCache(FEED_CACHE_KEY, posts, 60);
  console.log('Serving FEED from database and caching in Redis');
  return posts;
};

export const invalidateFeedCacheService = async () => {
  await deleteCache(FEED_CACHE_KEY);
};
