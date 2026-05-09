import express from 'express';
import db from './db/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Social Media API is running');
});

// Import routes
import authRoutes from './routes/user.route.js';

// Use routes
app.use('/api/auth', authRoutes);


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
