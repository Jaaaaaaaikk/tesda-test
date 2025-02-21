import { getPool } from '../db';

export default async function handler(req, res) {
  try {
    console.log('Connecting to the database...');
    const pool = getPool();
    console.log('Connected to the database. Executing query...');
    const [rows] = await pool.query('SELECT department_id, name FROM Departments');
    console.log('Query executed successfully. Sending response...');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}