const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderControllerSimple');
const { protect } = require('../middleware/authMiddleware');

// Public route for creating orders (guest checkout)
router.post('/', addOrderItems);

module.exports = router;
