import express from 'express';
import { applySecurityMiddlewares } from './middlewares/security.middleware.js';
import db from './db/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
applySecurityMiddlewares(app);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Social Media API is running');
});

// Import routes
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import likeRoutes from './routes/like.routes.js';
import followRoutes from './routes/follow.routes.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follows', followRoutes);

const PORT = process.env.PORT || 3000;
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

// Error handling middleware
import errorMiddleware from './middlewares/error.middleware.js';
app.use(errorMiddleware);
