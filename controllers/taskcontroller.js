import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskComplete
} from '../models/taskModel.js';

export const addTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await createTask(req.user.id, title, description, due_date);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const fields = req.body;

    const task = await updateTask(taskId, req.user.id, fields);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const removeTask = async (req, res) => {
  try {
    const task = await deleteTask(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await markTaskComplete(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
