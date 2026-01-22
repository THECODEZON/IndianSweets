const Festival = require('../models/Festival');

// @desc    Fetch all festivals
// @route   GET /api/festivals
// @access  Public
const getFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find({ active: true });
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a festival
// @route   POST /api/festivals
// @access  Private/Admin
const createFestival = async (req, res) => {
  try {
    const { name, startDate, endDate, bannerImage, headline, subtext, ctaText } = req.body;

    const festival = new Festival({
      name,
      startDate,
      endDate,
      bannerImage,
      headline,
      subtext,
      ctaText,
    });

    const createdFestival = await festival.save();
    res.status(201).json(createdFestival);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFestivals, createFestival };
