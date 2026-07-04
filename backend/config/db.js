const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Create a connection pool to MySQL database
 * This ensures efficient connection management
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sql_tutor_bot',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Test the database connection
 */
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    throw error;
  }
};

module.exports = { pool, testConnection };
