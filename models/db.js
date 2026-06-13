import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
      ssl: { rejectUnauthorized: false }
    });

export const query = (text, params) => pool.query(text, params);

export const connectToDb = async () => {
  try {
    const client = await pool.connect();
    console.log(' Connected to DB');
    client.release();
  } catch (err) {
    console.error('Failed to connect to DB', err);
    throw err;
  }
};

export { pool };
