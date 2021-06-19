const mongoose = require("mongoose");
const slugify = require("slugify");

const StateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a State name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create states slug from the name
StateSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("State", StateSchema);
