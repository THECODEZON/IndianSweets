const mongoose = require('mongoose');

const sweetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    festivalTags: [String],
    seasonTags: [String],
    description: {
      type: String,
      required: true,
    },
    ingredients: [String],
    images: [String],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Sweet = mongoose.model('Sweet', sweetSchema);

module.exports = Sweet;
