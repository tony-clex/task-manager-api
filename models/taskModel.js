import { pool } from './db.js';

export const createTask = async (owner_id, title, description, due_date) => {
  const res = await pool.query(
    `INSERT INTO tasks (owner_id, title, description, due_date)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [owner_id, title, description, due_date]
  );
  return res.rows[0];
};

export const getTasksByUser = async (owner_id) => {
  const res = await pool.query('SELECT * FROM tasks WHERE owner_id=$1', [owner_id]);
  return res.rows;
};

export const getTaskById = async (taskId, owner_id) => {
  const res = await pool.query('SELECT * FROM tasks WHERE id=$1 AND owner_id=$2', [taskId, owner_id]);
  return res.rows[0];
};

export const updateTask = async (taskId, owner_id, fields) => {
  const setString = Object.keys(fields)
    .map((key, i) => `${key}=$${i + 1}`)
    .join(', ');

  const values = Object.values(fields);
  values.push(taskId, owner_id);

  const res = await pool.query(
    `UPDATE tasks SET ${setString}, updated_at=CURRENT_TIMESTAMP WHERE id=$${values.length-1} AND owner_id=$${values.length} RETURNING *`,
    values
  );
  return res.rows[0];
};

export const deleteTask = async (taskId, owner_id) => {
  const res = await pool.query('DELETE FROM tasks WHERE id=$1 AND owner_id=$2 RETURNING *', [taskId, owner_id]);
  return res.rows[0];
};

export const markTaskComplete = async (taskId, owner_id) => {
  const res = await pool.query(
    'UPDATE tasks SET completed=TRUE, updated_at=CURRENT_TIMESTAMP WHERE id=$1 AND owner_id=$2 RETURNING *',
    [taskId, owner_id]
  );
  return res.rows[0];
};
