import './config/validateEnv.js'; // Ensuring environment variables are validated at startup

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import env from './config/env.js';

import db from './db/db.js';

import { applySecurityMiddlewares } from './middlewares/security.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import requestIdMiddleware from './middlewares/requestId.middleware.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import likeRoutes from './routes/like.routes.js';
import followRoutes from './routes/follow.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

applySecurityMiddlewares(app);
app.use(requestIdMiddleware);

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: env.CLIENT_URL || 'http://localhost:5173', // Allow requests from the client URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

// health route
app.get('/', (req, res) => {
  res.send('Social Media API is running');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorMiddleware);

const PORT = env.PORT || 3000;

db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit with failure
  });
