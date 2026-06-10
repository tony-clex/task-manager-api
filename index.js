import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectToDb } from './models/db.js';
import { userRoutes } from './routes/userRoutes.js';
import { taskRoutes } from './routes/taskRoutes.js';

import logger from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { limiter } from './middleware/ratelimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(limiter); // Apply rate limiting globally

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => res.send('API is running'));

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
  }
};

startServer();
