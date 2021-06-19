const mongoose = require("mongoose");
const slugify = require("slugify");

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  slug: String,
  stateId: {
    type: mongoose.Schema.ObjectId,
    ref: "State",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create bootcamp slug from the name
CitySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("City", CitySchema);
