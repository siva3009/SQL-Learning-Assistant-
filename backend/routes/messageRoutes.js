const express = require('express');
const messageController = require('../controllers/messageController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/send', messageController.sendMessage);

module.exports = router;