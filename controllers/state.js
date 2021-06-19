const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const State = require("../models/State");

// @desc      Get all states
// @route     GET /api/v1/states
// @access    Public
exports.getStates = asyncHandler(async (req, res, next) => {
  const states = await State.find({});
  res.status(200).json({ success: true, data: states });
});

// @desc      Get single state
// @route     GET /api/v1/states/:id
// @access    Public
exports.getState = asyncHandler(async (req, res, next) => {
  const state = await State.findById(req.params.id);

  if (!state) {
    return next(
      new ErrorResponse(`State not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: state });
});

// @desc      Create new state
// @route     POST /api/v1/states
// @access    Private
exports.createState = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // If the user is an admin, they can only add one state
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(`The user with ID ${req.user.id} is not admin`, 400)
    );
  }

  const state = await State.create(req.body);

  res.status(201).json({
    success: true,
    data: state,
  });
});

// @desc      Delete state
// @route     DELETE /api/v1/states/:id
// @access    Private
exports.deleteState = asyncHandler(async (req, res, next) => {
  const state = await State.findById(req.params.id);

  if (!state) {
    return next(
      new ErrorResponse(`State not found with id of ${req.params.id}`, 404)
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

  await state.remove();

  res.status(200).json({ success: true, data: {} });
});
