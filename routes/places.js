const express = require("express");
const {
  getPlaces,
  getPlace,
  createPlace,
  deletePlace,
  mostViewed,
  getPlacesFilter,
  getFilteredPlaces,
} = require("../controllers/place");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Place = require("../models/Place");

router
  .route("/")
  .get(advancedResults(Place, "similarSpots"), getPlaces)
  .post(protect, authorize("admin"), createPlace);

router
  .route("/most-viewed")
  .get(protect, authorize("user", "admin"), mostViewed);

router.route("/filter").get(advancedResults(Place), getPlacesFilter);

router.route("/filterPlace").post(advancedResults(Place), getFilteredPlaces);

router
  .route("/:id")
  .get(getPlace)
  .delete(protect, authorize("admin"), deletePlace);

module.exports = router;
