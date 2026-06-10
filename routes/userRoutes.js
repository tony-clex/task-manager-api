import express from 'express';
import { registerUser } from '../controllers/usercontroller.js';
import { loginUser } from '../controllers/authcontroller.js'; // fixed import
import { protect } from '../middleware/middleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (example)
router.use(protect);

export { router as userRoutes };
