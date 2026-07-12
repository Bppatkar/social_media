import './config/validateEnv.js'; // Ensuring environment variables are validated at startup

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import env from './config/env.js';

import { applySecurityMiddlewares } from './middlewares/security.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { requestIdMiddleware } from './middlewares/requestId.middleware.js';
import loggerMiddleware from './middlewares/logger.middleware.js';
import morgan from 'morgan';
import loggerStream from './utils/loggerStream.js';
import compression from 'compression';

// Import routes
import searchRoutes from './routes/search.routes.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import likeRoutes from './routes/like.routes.js';
import followRoutes from './routes/follow.routes.js';
import adminRoutes from './routes/admin.routes.js';
import feedRoutes from './routes/feed.routes.js';
import monitoringRoutes from './routes/monitoring.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import userRoutes from './routes/user.routes.js';
import { setCache, getCache } from './services/redis.service.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

const app = express();

const allowedOrigins = new Set(
  env.CLIENT_URL.split(',').map((origin) => origin.trim())
);

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/test', (_req, res) => {
  res.send('TEST ROUTE WORKING');
});

app.set('trust proxy', 1); // trust first proxy used for , rate limiting and secure cookies in production behind a proxy/load balancer

applySecurityMiddlewares(app);
app.use(compression()); // Compress all responses to reduce payload size and improve performance
app.use(requestIdMiddleware);
app.use(loggerMiddleware);
app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' })); // attackers can only send small payloads to prevent DoS attacks

app.use(
  morgan(':method :url :status :response-time ms', {
    stream: loggerStream,
  })
);

// Monitoring routes
app.use('/api/monitoring', monitoringRoutes);

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
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use(errorMiddleware);

export default app;
