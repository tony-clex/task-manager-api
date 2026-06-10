import express from 'express';
import { registerUser } from '../controllers/usercontroller.js';
import { loginUser } from '../controllers/authcontroller.js'; // fixed import
import { protect } from '../middleware/middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(protect);

export { router as userRoutes };
