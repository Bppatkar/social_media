import './config/validateEnv.js'; // Ensuring environment variables are validated at startup

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import env from './config/env.js';

import db from './db/db.js';

import { applySecurityMiddlewares } from './middlewares/security.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { requestIdMiddleware } from './middlewares/requestId.middleware.js';
import loggerMiddleware from './middlewares/logger.middleware.js';
import morgan from 'morgan';
import loggerStream from './utils/loggerStream.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import likeRoutes from './routes/like.routes.js';
import followRoutes from './routes/follow.routes.js';
import adminRoutes from './routes/admin.routes.js';
import feedRoutes from './routes/feed.routes.js';
import { connectRedis } from './config/redis.js';
import { setCache, getCache, deleteCache } from './services/redis.service.js';

const app = express();
app.set('trust proxy', 1); // trust first proxy used for , rate limiting and secure cookies in production behind a proxy/load balancer

applySecurityMiddlewares(app);
app.use(requestIdMiddleware);
app.use(loggerMiddleware);
app.use(cookieParser());

app.use(
  cors({
    origin: env.CLIENT_URL || 'http://localhost:5173', // Allow requests from the client URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json({ limit: '10kb' })); // attackers can only send small payloads to prevent DoS attacks

app.use(
  morgan(':method :url :status :response-time ms', {
    stream: loggerStream,
  })
);

// health route
app.get('/', (req, res) => {
  res.send('Social Media API is running');
});

// testing redis
app.get('/cache-test', async (_req, res) => {
  await setCache(
    'user:1',
    {
      name: 'Bhanu',
      role: 'admin',
    },
    60
  );

  const user = await getCache('user:1');

  res.json({
    success: true,
    data: user,
  });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feed', feedRoutes);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await db();
    await connectRedis();

    app.listen(env.PORT, () => {
      console.log(`Server is running on port http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit with failure
  }
};

startServer();
