const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Place = require("../models/Place");
const e = require("express");

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/v1/users/favourait/
// @access    Private/Admin/User
exports.addToFavourait = asyncHandler(async (req, res, next) => {
  let previousUser = await User.findById(req.user._id);

  if (!previousUser.favouraits.includes(req.body.id)) {
    const favouraits = [...previousUser.favouraits, req.body.id];
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        favouraits,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    let place = await Place.findById(req.body.id);

    place.favourait = place.favourait + 1;

    await Place.findByIdAndUpdate(req.body.id, place);

    console.log(user);
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    res.status(200).json({
      success: true,
      data: "Already Added",
    });
  }
});

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
