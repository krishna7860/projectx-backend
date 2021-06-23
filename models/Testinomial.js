const mongoose = require("mongoose");
const slugify = require("slugify");

const TestinomialSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: [true, "Please add a Author name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  review: {
    type: String,
    required: [true, "Please add a Description name"],
    trim: true,
    maxlength: [3000, "Name can not be more than 50 characters"],
  },
  avatarUrl: {
    type: String,
  },
  rating: {
    type: Number,
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create states slug from the name
TestinomialSchema.pre("save", function (next) {
  this.slug = slugify(this.authorName, { lower: true });
  next();
});

module.exports = mongoose.model("Testinomial", TestinomialSchema);
