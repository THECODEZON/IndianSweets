const express = require('express');
const router = express.Router();
const { getFestivals, createFestival } = require('../controllers/festivalController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getFestivals).post(protect, admin, createFestival);

module.exports = router;
