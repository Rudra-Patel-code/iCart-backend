import CustomError from "../config/CustomError.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const identifier = name.split(" ").join("").toLowerCase();

  let category = await Category.findOne({ identifier });

  if (category) return next(new CustomError(`${name} already exists`, 400));

  category = await Category.create({ name, identifier });

  res.status(200).json({
    success: true,
    message: "Category Created Successfully",
  });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.find({});

  res.status(200).json({ success: true, category });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "Category deleted successfully" });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const identifier = name.split(" ").join("").toLowerCase();

  let category = await Category.findOne({ identifier });

  if (category) return next(new CustomError(`${name} already exists`));

  category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, identifier },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Category Updated Successfully" });
});

export const getOneCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const category = await Category.findById(id);

  if (!category) return next(new CustomError("Category Not found", 404));

  res.status(200).json({ success: true, category });
});
