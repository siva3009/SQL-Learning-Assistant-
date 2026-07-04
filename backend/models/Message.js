const { pool } = require('../config/db');
const { hydrateMessageRow } = require('../services/chatMessageFormatter');

const Message = {
  create: async ({ chatId, userId, role, content }, db = pool) => {
    const insertQuery = `
      INSERT INTO messages (chat_id, user_id, role, content, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;

    const [result] = await db.execute(insertQuery, [chatId, userId, role, content]);
    return Message.findById(result.insertId, db);
  },

  findById: async (messageId, db = pool) => {
    const query = `
      SELECT id, chat_id, user_id, role, content, created_at
      FROM messages
      WHERE id = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(query, [messageId]);
    return rows.length > 0 ? hydrateMessageRow(rows[0]) : null;
  },

  findByChatId: async (chatId, db = pool) => {
    const query = `
      SELECT id, chat_id, user_id, role, content, created_at
      FROM messages
      WHERE chat_id = ?
      ORDER BY created_at ASC, id ASC
    `;

    const [rows] = await db.execute(query, [chatId]);
    return rows.map(hydrateMessageRow);
  },

  deleteByChatId: async (chatId, db = pool) => {
    const [result] = await db.execute('DELETE FROM messages WHERE chat_id = ?', [chatId]);
    return result.affectedRows;
  }
};

module.exports = Message;