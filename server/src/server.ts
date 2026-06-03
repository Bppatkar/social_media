import './config/validateEnv.js';

import app from './app.js';

import env from './config/env.js';
import db from './db/db.js';

import { connectRedis } from './config/redis.js';

const startServer = async () => {
  try {
    await db();

    await connectRedis();

    app.listen(env.PORT, () => {
      console.log(
        `Server is running on port http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);

    process.exit(1);
  }
};

startServer();