const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Place = require("../models/Place");

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const { stateId } = req.params;
  const reviews = await Review.find({ stateId }).populate({ path: "user" });
  res.status(200).json({ success: true, data: reviews });
});

// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`review not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: review });
});

// @desc      Create new review
// @route     POST /api/v1/reviews
// @access    Private
exports.createReview = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;
  const { placeId } = req.query;

  // If the user is an admin, they can only add one review
  //   if (req.user.role !== "admin") {
  //     return next(
  //       new ErrorResponse(`The user with ID ${req.user.id} is not admin`, 400)
  //     );
  //   }

  const review = await Review.create({ ...req.body });

  const place = await Place.findByIdAndUpdate(placeId, {
    $push: { reviews: { $each: [review._id], $position: 0 } },
  });

  res.status(201).json({
    success: true,
    data: place,
  });
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`review not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this review`,
        401
      )
    );
  }

  await review.remove();

  res.status(200).json({ success: true, data: {} });
});
