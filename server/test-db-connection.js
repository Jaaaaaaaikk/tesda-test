// filepath: /c:/Users/sscam/OneDrive/Desktop/nuxt/server/test-db-connection.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const testConnection = async () => {
  try {
    const pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log("Connected to the database!");
    connection.release();
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

testConnection();