const Sweet = require('../models/Sweet');

// @desc    Fetch all sweets
// @route   GET /api/sweets
// @access  Public
const getSweets = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    // Filters
    const { category, festival, season } = req.query;
    let filter = { ...keyword };

    if (category) filter.category = category;
    if (festival) filter.festivalTags = { $in: [festival] };
    if (season) filter.seasonTags = { $in: [season] };

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single sweet
// @route   GET /api/sweets/:id
// @access  Public
const getSweetById = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (sweet) {
      res.json(sweet);
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a sweet
// @route   POST /api/sweets
// @access  Private/Admin
const createSweet = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      festivalTags,
      seasonTags,
      description,
      ingredients,
      images,
      stock,
    } = req.body;

    const sweet = new Sweet({
      name,
      price,
      category,
      festivalTags,
      seasonTags,
      description,
      ingredients,
      images,
      stock,
    });

    const createdSweet = await sweet.save();
    res.status(201).json(createdSweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private/Admin
const updateSweet = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      festivalTags,
      seasonTags,
      description,
      ingredients,
      images,
      stock,
    } = req.body;

    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
      sweet.name = name || sweet.name;
      sweet.price = price || sweet.price;
      sweet.category = category || sweet.category;
      sweet.festivalTags = festivalTags || sweet.festivalTags;
      sweet.seasonTags = seasonTags || sweet.seasonTags;
      sweet.description = description || sweet.description;
      sweet.ingredients = ingredients || sweet.ingredients;
      sweet.images = images || sweet.images;
      sweet.stock = stock || sweet.stock;

      const updatedSweet = await sweet.save();
      res.json(updatedSweet);
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
      await sweet.deleteOne();
      res.json({ message: 'Sweet removed' });
    } else {
      res.status(404).json({ message: 'Sweet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSweets,
  getSweetById,
  createSweet,
  updateSweet,
  deleteSweet,
};
