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

// Static method to get avg of course tuitions
CategorySchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  try {
    if (obj[0]) {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
      });
    } else {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageCost: undefined,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
CategorySchema.post("save", async function () {
  await this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost after remove
CategorySchema.post("remove", async function () {
  await this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Category", CategorySchema);
