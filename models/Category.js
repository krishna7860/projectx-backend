const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  placesCount: {
    type: Number,
    default: 0,
  },
  slug: String,
  banner: {
    type: String,
    required: [true, "Banner is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
