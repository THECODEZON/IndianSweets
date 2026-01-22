const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    headline: String,
    subtext: String,
    ctaText: String,
  },
  {
    timestamps: true,
  }
);

const Festival = mongoose.model('Festival', festivalSchema);

module.exports = Festival;
