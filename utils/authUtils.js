import { asyncHandler } from "../middlewares/asyncHandler.js";
import CustomError from "../config/CustomError.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new CustomError("Please Login", 400));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded._id;

  req.user = await User.findById(id);
  next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role !== "admin")
    return next(new CustomError("Not Authorized to access this resource", 404));

  next();
});
