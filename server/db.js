import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log('DB Config:', {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// MySQL database configuration
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD || '', // Use empty string if password is not set
  database: process.env.DATABASE,
};

// MySQL connection pool
let pool;

const createPool = () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
};

export const getPool = () => {
  if (!pool) {
    pool = createPool();
  }
  return pool;
};
