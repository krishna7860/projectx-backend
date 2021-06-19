const express = require("express");
const {
    getPlaces,
    getPlace,
    createPlace,
    deletePlace
} = require("../controllers/place");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Place = require("../models/Place");

router.route("/").get(advancedResults(Place),getPlaces).post(protect, authorize("admin"), createPlace);

router
  .route("/:id")
  .get(getPlace)
  .delete(protect, authorize("admin"), deletePlace);

module.exports = router;
