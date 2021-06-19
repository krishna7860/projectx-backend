const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const City = require("../models/City");

// @desc      Get all cities
// @route     GET /api/v1/cities
// @access    Public
exports.getCities = asyncHandler(async (req, res, next) => {
  const { stateId } = req.params;
  const cities = await City.find({ stateId });
  res.status(200).json({ success: true, data: cities });
});

// @desc      Get single city
// @route     GET /api/v1/cities/:id
// @access    Public
exports.getCity = asyncHandler(async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return next(
      new ErrorResponse(`city not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: city });
});

// @desc      Create new city
// @route     POST /api/v1/cities
// @access    Private
exports.createCity = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;
  const { stateId } = req.params;

  // If the user is an admin, they can only add one city
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(`The user with ID ${req.user.id} is not admin`, 400)
    );
  }

  if (!stateId) {
    return next(new ErrorResponse(`State id is required in params`, 400));
  }

  const city = await City.create({ ...req.body, stateId });

  res.status(201).json({
    success: true,
    data: city,
  });
});

// @desc      Delete city
// @route     DELETE /api/v1/cities/:id
// @access    Private
exports.deleteCity = asyncHandler(async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return next(
      new ErrorResponse(`city not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this city`,
        401
      )
    );
  }

  await city.remove();

  res.status(200).json({ success: true, data: {} });
});
