const express = require("express");
const {
  getCategories,
  getCategory,
  createCategories,
  deleteCategory,
} = require("../controllers/category");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Category = require("../models/Category");

router
  .route("/")
  .get(advancedResults(Category), getCategories)
  .post(protect, authorize("admin"), createCategories);

router
  .route("/:id")
  .get(getCategory)
  .delete(protect, authorize("admin"), deleteCategory);

module.exports = router;
