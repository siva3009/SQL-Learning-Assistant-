/**
 * User Model
 * Database operations for user management
 */

const { pool } = require('../config/db');

const User = {
  /**
   * Create a new user
   * @param {Object} userData - { username, email, hashedPassword }
   * @returns {Promise<Object>} Created user
   */
  create: async (userData) => {
    const { username, email, password } = userData;
    
    const query = `
      INSERT INTO users (username, email, password, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    
    try {
      const [result] = await pool.execute(query, [username, email, password]);
      return {
        id: result.insertId,
        username,
        email,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists');
      }
      throw error;
    }
  },

  /**
   * Find user by email
   * @param {string} email
   * @returns {Promise<Object|null>} User object or null
   */
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Find user by ID
   * @param {number} id
   * @returns {Promise<Object|null>} User object or null
   */
  findById: async (id) => {
    const query = 'SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Find user by username
   * @param {string} username
   * @returns {Promise<Object|null>} User object or null
   */
  findByUsername: async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Ensure the demo user exists for chat persistence.
   * @returns {Promise<Object>} Demo user record
   */
  ensureDemoUser: async () => {
    const username = process.env.DEFAULT_CHAT_USERNAME || 'demo_user';
    const email = process.env.DEFAULT_CHAT_EMAIL || 'demo@example.com';
    const password = process.env.DEFAULT_CHAT_PASSWORD || 'sql-tutor-demo';

    const existingQuery = 'SELECT id, username, email, created_at, updated_at FROM users WHERE email = ? OR username = ? LIMIT 1';
    const [existingRows] = await pool.execute(existingQuery, [email, username]);

    if (existingRows.length > 0) {
      return existingRows[0];
    }

    const insertQuery = `
      INSERT INTO users (username, email, password, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;

    try {
      const [result] = await pool.execute(insertQuery, [username, email, password]);
      return User.findById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const [rows] = await pool.execute(existingQuery, [email, username]);
        if (rows.length > 0) {
          return rows[0];
        }
      }
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {number} id - User ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated user
   */
  update: async (id, updates) => {
    const allowedFields = ['username', 'email'];
    const updateFields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updateFields.length === 0) {
      return User.findById(id);
    }

    updateFields.push('updated_at = NOW()');
    values.push(id);

    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

    try {
      await pool.execute(query, values);
      return User.findById(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists');
      }
      throw error;
    }
  },

  /**
   * Change user password
   * @param {number} id - User ID
   * @param {string} newHashedPassword
   * @returns {Promise<boolean>} Success status
   */
  updatePassword: async (id, newHashedPassword) => {
    const query = 'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?';
    const [result] = await pool.execute(query, [newHashedPassword, id]);
    return result.affectedRows > 0;
  },

  /**
   * Delete user (soft delete recommended, but this is hard delete)
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  delete: async (id) => {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  },

  /**
   * Check if email exists
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  emailExists: async (email) => {
    const query = 'SELECT id FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows.length > 0;
  },

  /**
   * Check if username exists
   * @param {string} username
   * @returns {Promise<boolean>}
   */
  usernameExists: async (username) => {
    const query = 'SELECT id FROM users WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows.length > 0;
  }
};

module.exports = User;
