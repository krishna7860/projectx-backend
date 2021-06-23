const express = require("express");
const {
  createReview,
  deleteReview,
  getReview,
  getReviews,
} = require("../controllers/review");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Review = require("../models/Review");

router
  .route("/")
  .get(advancedResults(Review), getReviews)
  .post(protect, authorize("admin", "user"), createReview);

router
  .route("/:id")
  .get(getReview)
  .delete(protect, authorize("admin", "user"), deleteReview);

module.exports = router;
