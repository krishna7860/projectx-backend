const express = require("express");
const {
  createState,
  deleteState,
  getState,
  getStates,
} = require("../controllers/state");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getStates).post(protect, authorize("admin"), createState);

router
  .route("/:id")
  .get(getState)
  .delete(protect, authorize("admin"), deleteState);

module.exports = router;
  