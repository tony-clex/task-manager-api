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

router.use(protect);

router.post('/', addTask);
router.get('/', getTasks);
router.put('/:id', editTask);
router.delete('/:id', removeTask);
router.patch('/:id/complete', completeTask);

export { router as taskRoutes };
