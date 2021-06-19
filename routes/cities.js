const express = require("express");
const {
  createCity,
  deleteCity,
  getCities,
  getCity,
} = require("../controllers/city");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const City = require("../models/City");

router
  .route("/:stateId")
  .get(advancedResults(City), getCities)
  .post(protect, authorize("admin"), createCity);

router
  .route("/:id/:stateId")
  .get(getCity)
  .delete(protect, authorize("admin"), deleteCity);

module.exports = router;
