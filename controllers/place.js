const asyncHandler = require("../middleware/async");
const Place = require("../models/Place");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all places
// @route     GET /api/v1/places
// @access    All/Admin
// @query     categoryId, stateId
exports.getPlaces = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get all places
// @route     GET /api/v1/places
// @access    All/Admin
// @query     categoryId, stateId
exports.getFilteredPlaces = asyncHandler(async (req, res, next) => {
  let filterIds = req.body.map((filter) => filter.id);
  let filteredResponse = {};
  console.log(filterIds);

  res.advancedResults.data = res.advancedResults.data.map((item) => {
    for (let i = 0; i < item.options.length; i++) {
      if (filterIds.includes(item.options[i].id)) {
        filteredResponse[item._id] = item;
      }
    }
  });

  res.advancedResults.data = [...Object.values(filteredResponse)];

  res.status(200).json(res.advancedResults);
});

// @desc      Get all places
// @route     GET /api/v1/places
// @access    All/Admin
// @query     categoryId, stateId
exports.getPlacesFilter = asyncHandler(async (req, res, next) => {
  let options = [];
  res.advancedResults.data.forEach(
    (data) => (options = [...options, ...data.options])
  );

  let map = {};
  options.map((item) => (map[item.id] = item));

  res.status(200).json({ data: Object.values(map) });
});

// @desc      Get single place
// @route     GET /api/v1/places/:id
// @access    All/Admin
// @required  recive placeId in request params
exports.getPlace = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (!place) {
    return next(new ErrorResponse(`place not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: place,
  });
});

// @desc      Create place
// @route     GET /api/v1/places
// @access    Private/Admin
// @required  recive place data object in request body
exports.createPlace = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const place = await Place.create(data);
  res.status(200).json({
    success: true,
    data: place,
  });
});

// @desc      Delete single place
// @route     GET /api/v1/places/:id
// @access    All/Admin
// @required  recive placeId in request params
exports.deletePlace = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (!place) {
    return next(new ErrorResponse(`category not found with id of ${id}`, 404));
  }
  await place.remove();
  res.status(200).json({ success: true, data: {} });
});

exports.mostViewed = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const preferences = user.preferences || [];

  const places = await Place.find({
    catagoryId: { $in: preferences },
  })
    .populate([{ path: "stateId" }])
    .sort({ views: -1 });

  res.status(200).json({ success: true, data: places });
});
