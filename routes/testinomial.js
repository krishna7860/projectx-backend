const express = require("express");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const {
  getTestinomial,
  createTestinomial,
} = require("../controllers/testinomial");

router
  .route("/")
  .get(getTestinomial)
  .post(protect, authorize("admin", "user"), createTestinomial);

module.exports = router;
