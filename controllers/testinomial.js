const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const City = require("../models/City");
const Testinomial = require("../models/Testinomial");
const Place = require("../models/Place");

// @desc      Get all cities
// @route     GET /api/v1/cities
// @access    Public
exports.getTestinomial = asyncHandler(async (req, res, next) => {
  const testinomial = await Testinomial.find({});
  res.status(200).json({ success: true, data: testinomial });
});

// @desc      Create new Testinomial
// @route     POST /api/v1/cities
// @access    Private
exports.createTestinomial = asyncHandler(async (req, res, next) => {
  // If the user is an admin, they can only add one city
  if (req.user.role !== "user") {
    return next(
      new ErrorResponse(`The user with ID ${req.user.id} is not admin`, 400)
    );
  }

  const testinomial = await Testinomial.create({ ...req.body });

  res.status(201).json({
    success: true,
    data: testinomial,
  });
});
