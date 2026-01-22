const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/messageController');

// Public route - anyone can send a message
router.post('/', createMessage);

// Admin routes - would need authentication middleware in production
router.get('/', getMessages);
router.get('/:id', getMessage);
router.put('/:id', updateMessageStatus);
router.delete('/:id', deleteMessage);

module.exports = router;
