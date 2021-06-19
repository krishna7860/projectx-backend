const mongoose = require("mongoose");
const slugify = require("slugify");

const StateSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add a State name"],
      trim: true,
      maxlength: [300, "Name can not be more than 50 characters"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    placeId: {
      type: mongoose.Schema.ObjectId,
      ref: "Place",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("State", StateSchema);
