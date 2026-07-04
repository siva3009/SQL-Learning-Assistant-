const { generateSQLTutorResponse } = require('../services/aiService');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const { pool } = require('../config/db');
const { serializeAssistantPayload } = require('../services/chatMessageFormatter');

const sendMessage = async (req, res) => {
  const { chat_id: rawChatId, content } = req.body || {};
  const chatId = Number(rawChatId);

  if (!Number.isInteger(chatId) || chatId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'chat_id is required',
      error: 'VALIDATION_ERROR'
    });
  }

  if (!content || !String(content).trim()) {
    return res.status(400).json({
      success: false,
      message: 'Message content is required',
      error: 'VALIDATION_ERROR'
    });
  }

  try {
    const userId = Number(req.user?.id);
    const chat = await Chat.findById(chatId, userId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
        error: 'CHAT_NOT_FOUND'
      });
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const userMessage = await Message.create({
        chatId,
        userId,
        role: 'user',
        content: String(content).trim()
      }, connection);

      const aiResponse = await generateSQLTutorResponse(content);
      const assistantPayload = {
        answer: aiResponse.answer,
        sqlQuery: aiResponse.sqlQuery,
        explanation: aiResponse.explanation,
        resultPreview: aiResponse.resultPreview,
        suggestions: aiResponse.suggestions
      };

      const assistantMessage = await Message.create({
        chatId,
        userId,
        role: 'assistant',
        content: serializeAssistantPayload(assistantPayload)
      }, connection);

      await Chat.touch(chatId, userId, connection);
      await connection.commit();

      return res.status(200).json({
        success: true,
        chat_id: chatId,
        assistantMessage: {
          ...assistantMessage,
          ...assistantPayload
        },
        messages: [
          userMessage,
          {
            ...assistantMessage,
            ...assistantPayload
          }
        ]
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Message send failed:', error.message);

    if (error.message === 'GEMINI_API_KEY is not configured') {
      return res.status(502).json({
        success: false,
        message: 'Sorry, I could not generate a response right now. Please try again.',
        error: 'AI_SERVICE_UNAVAILABLE'
      });
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to send message',
      error: error.code || 'MESSAGE_SEND_FAILED'
    });
  }
};

module.exports = {
  sendMessage
};