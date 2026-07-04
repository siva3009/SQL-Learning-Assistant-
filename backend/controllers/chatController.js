const Chat = require('../models/Chat');
const Message = require('../models/Message');

const parseChatId = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const createChat = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id);
    const chat = await Chat.create({
      userId,
      title: req.body?.title || 'New Chat'
    });

    return res.status(201).json({
      success: true,
      message: 'Chat created',
      chat,
      messages: []
    });
  } catch (error) {
    return next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id);
    const query = String(req.query?.q || '').trim();
    const chats = query
      ? await Chat.findByTitle(userId, query)
      : await Chat.findHistoryByUser(userId);

    return res.status(200).json({
      success: true,
      chats
    });
  } catch (error) {
    return next(error);
  }
};

const getChatMessages = async (req, res, next) => {
  try {
    const chatId = parseChatId(req.params.id);
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid chat id'
      });
    }

    const userId = Number(req.user?.id);
    const chat = await Chat.findById(chatId, userId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    const messages = await Message.findByChatId(chatId);

    return res.status(200).json({
      success: true,
      chat,
      messages
    });
  } catch (error) {
    return next(error);
  }
};

const getChat = async (req, res, next) => getChatMessages(req, res, next);

const renameChat = async (req, res, next) => {
  try {
    const chatId = parseChatId(req.params.id);
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid chat id'
      });
    }

    const title = req.body?.title || 'Renamed Chat';
    const userId = Number(req.user?.id);
    const chat = await Chat.rename(chatId, userId, title);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Chat renamed',
      chat
    });
  } catch (error) {
    return next(error);
  }
};

const deleteChat = async (req, res, next) => {
  try {
    const chatId = parseChatId(req.params.id);
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid chat id'
      });
    }

    const userId = Number(req.user?.id);
    await Chat.deleteById(chatId, userId);

    return res.status(200).json({
      success: true,
      message: 'Chat deleted',
      chat_id: chatId
    });
  } catch (error) {
    return next(error);
  }
};

const searchChats = getHistory;

module.exports = {
  createChat,
  getHistory,
  getChat,
  getChatMessages,
  renameChat,
  deleteChat,
  searchChats
};