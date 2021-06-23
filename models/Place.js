const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the places"],
    maxlength: 100,
  },
  subTitle: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add some text"],
  },
  images: [{ type: String }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [false, "Please add a rating between 1 and 5"],
  },
  favourait: {
    type: Number,
    min: 1,
    required: [true, "Please add a favourait"],
  },
  highlights: [
    {
      type: String,
    },
  ],
  similarSpots: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Place",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },
  ],
  totalReviews: {
    type: Number,
  },
  views: {
    type: Number,
  },
  options: [
    {
      type: Object,
    },
  ],
  stateId: {
    type: mongoose.Schema.ObjectId,
    ref: "State",
  },
  catagoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
});

// Prevent user from submitting more than one review per bootcamp
// PlaceSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// // Static method to get avg rating and save
// PlaceSchema.statics.getAverageRating = async function (bootcampId) {
//   const obj = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId },
//     },
//     {
//       $group: {
//         _id: "$bootcamp",
//         averageRating: { $avg: "$rating" },
//       },
//     },
//   ]);

//   try {
//     await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
//       averageRating: obj[0].averageRating,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Call getAverageCost after save
// PlaceSchema.post("save", async function () {
//   await this.constructor.getAverageRating(this.);
// });

// // Call getAverageCost before remove
// PlaceSchema.post("remove", async function () {
//   await this.constructor.getAverageRating(this.bootcamp);
// });

module.exports = mongoose.model("Place", PlaceSchema);
