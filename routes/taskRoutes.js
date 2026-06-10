// routes/taskRoutes.js
import express from 'express';
import {
  addTask,
  getTasks,
  editTask,
  removeTask,
  completeTask
} from '../controllers/taskcontroller.js';
import { protect } from '../middleware/middleware.js';
const router = express.Router();

// All routes are protected
router.use(protect);

// Task routes
router.post('/', addTask);
router.get('/', getTasks);
router.put('/:id', editTask);
router.delete('/:id', removeTask);
router.patch('/:id/complete', completeTask);

// Export the router
export { router as taskRoutes };
