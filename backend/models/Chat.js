const { pool } = require('../config/db');

const toISO = (value) => {
  if (!value) {
    return new Date().toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

const mapChatRow = (row) => ({
  id: row.id,
  user_id: row.user_id,
  title: row.title,
  created_at: toISO(row.created_at),
  updated_at: toISO(row.updated_at)
});

const Chat = {
  create: async ({ userId, title }, db = pool) => {
    const chatTitle = String(title || 'New Chat').trim() || 'New Chat';
    const insertQuery = `
      INSERT INTO chats (user_id, title, created_at, updated_at)
      VALUES (?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(insertQuery, [userId, chatTitle]);
    return Chat.findById(result.insertId, userId, db);
  },

  findById: async (chatId, userId = null, db = pool) => {
    const query = userId
      ? 'SELECT id, user_id, title, created_at, updated_at FROM chats WHERE id = ? AND user_id = ? LIMIT 1'
      : 'SELECT id, user_id, title, created_at, updated_at FROM chats WHERE id = ? LIMIT 1';
    const params = userId ? [chatId, userId] : [chatId];

    const [rows] = await db.execute(query, params);
    return rows.length > 0 ? mapChatRow(rows[0]) : null;
  },

  findHistoryByUser: async (userId, db = pool) => {
    const query = `
      SELECT id, user_id, title, created_at, updated_at
      FROM chats
      WHERE user_id = ?
      ORDER BY updated_at DESC, id DESC
    `;

    const [rows] = await db.execute(query, [userId]);
    return rows.map(mapChatRow);
  },

  findByTitle: async (userId, queryText, db = pool) => {
    const query = `
      SELECT id, user_id, title, created_at, updated_at
      FROM chats
      WHERE user_id = ? AND title LIKE ?
      ORDER BY updated_at DESC, id DESC
    `;

    const [rows] = await db.execute(query, [userId, `%${queryText}%`]);
    return rows.map(mapChatRow);
  },

  rename: async (chatId, userId, title, db = pool) => {
    const chatTitle = String(title || '').trim();
    if (!chatTitle) {
      throw new Error('Chat title is required');
    }

    const query = 'UPDATE chats SET title = ?, updated_at = NOW() WHERE id = ? AND user_id = ?';
    const [result] = await db.execute(query, [chatTitle, chatId, userId]);

    if (result.affectedRows === 0) {
      return null;
    }

    return Chat.findById(chatId, userId, db);
  },

  touch: async (chatId, userId, db = pool) => {
    const query = 'UPDATE chats SET updated_at = NOW() WHERE id = ? AND user_id = ?';
    const [result] = await db.execute(query, [chatId, userId]);
    return result.affectedRows > 0;
  },

  deleteById: async (chatId, userId, db = pool) => {
    const connection = db.getConnection ? await db.getConnection() : db;
    const isPooledConnection = typeof connection.beginTransaction === 'function' && typeof connection.release === 'function';

    try {
      if (isPooledConnection) {
        await connection.beginTransaction();
      }

      const [messageResult] = await connection.execute('DELETE FROM messages WHERE chat_id = ?', [chatId]);
      const [chatResult] = await connection.execute('DELETE FROM chats WHERE id = ? AND user_id = ?', [chatId, userId]);

      if (chatResult.affectedRows === 0) {
        const notFoundError = new Error('Chat not found');
        notFoundError.statusCode = 404;
        throw notFoundError;
      }

      if (isPooledConnection) {
        await connection.commit();
      }

      return {
        deletedChat: chatResult.affectedRows > 0,
        deletedMessages: messageResult.affectedRows
      };
    } catch (error) {
      if (isPooledConnection) {
        await connection.rollback();
      }
      throw error;
    } finally {
      if (isPooledConnection) {
        connection.release();
      }
    }
  }
};

module.exports = Chat;