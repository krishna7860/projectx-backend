const asyncHandler = require("../middleware/async");
const Categories = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    All/Admin
exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single categories
// @route     GET /api/v1/categories/:id
// @access    All/Admin
// @required  recive categoryId in request params
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Categories.findById(id);
  if (!category) {
    return next(new ErrorResponse(`category not found with id of ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc      Create user
// @route     GET /api/v1/categories
// @access    Private/Admin
// @required  recive category data object in request body
exports.createCategories = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const category = await Categories.create(data);
  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc      Delete single categories
// @route     GET /api/v1/categories/:id
// @access    All/Admin
// @required  recive categoryId in request params
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Categories.findById(id);
  if (!category) {
    return next(new ErrorResponse(`category not found with id of ${id}`, 404));
  }
  await category.remove();
  res.status(200).json({ success: true, data: {} });
});
