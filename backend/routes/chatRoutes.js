const express = require('express');
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/new', chatController.createChat);
router.get('/history', chatController.getHistory);
router.get('/search', chatController.searchChats);
router.put('/:id/rename', chatController.renameChat);
router.get('/:id/messages', chatController.getChatMessages);
router.get('/:id', chatController.getChat);
router.delete('/:id', chatController.deleteChat);

module.exports = router;