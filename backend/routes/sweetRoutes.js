const express = require('express');
const router = express.Router();
const {
  getSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  getSweetById,
} = require('../controllers/sweetController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSweets).post(protect, admin, createSweet);

// Temporary route for adding sweets without auth (for testing)
router.post('/temp-add', createSweet);

// Temporary route for updating prices without auth (for testing)
router.put('/temp-update/:id', updateSweet);

router.route('/:id').get(getSweetById).put(protect, admin, updateSweet).delete(protect, admin, deleteSweet);

module.exports = router;
