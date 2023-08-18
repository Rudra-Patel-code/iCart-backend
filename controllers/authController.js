import CustomError from "../config/CustomError.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

const cookieOptions = {
  // httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const registerController = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPass } = req.body;

  // Check all fields are given
  if (!name || !email || !password || !confirmPass) {
    return next(new CustomError("Please Fill All Fields", 400));
  }

  if (password !== confirmPass)
    return next(new CustomError("Please confirm Password", 400));

  //   checking if email is already used
  let user = await User.findOne({ email });
  if (user) return next(new CustomError("Email already used ! ", 400));

  //    creating user

  user = await User.create({
    name,
    email,
    password,
  });

  const token = await user.getJWTToken();

  res
    .status(201)
    .cookie("token", token, cookieOptions)
    .json({ success: true, message: "Registered Successfully", user });
});

export const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new CustomError("Please enter all fields", 400));

  let user = await User.findOne({ email }).select("+password");

  if (!user)
    return next(new CustomError("User not Found , Please Register First", 400));

  const isMatched = await user.comparePassword(password);

  if (!isMatched)
    return next(new CustomError("invalid email or password", 400));

  const token = await user.getJWTToken();

  //   finding user again to get without password
  user = await User.findOne({ email });

  res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json({ sucess: true, message: `Welcome Back ${user.name}`, user });
});

export const myUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ success: true, user });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ success: true, message: "Logout Successfull" });
});

export const testRouter = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ sucess: true, user });
});

export const changeRole = asyncHandler(async (req, res, next) => {
  const { id, role } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { role: role === "admin" ? "user" : "admin" },
    { new: true }
  );

  const users = await User.find({});

  res.status(200).json({
    success: true,
    user,
    message: `${user.name}'s Role is Changed to ${user.role}`,
    users,
  });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({ success: true, users });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  const users = await User.find({});

  res
    .status(202)
    .json({ success: true, message: "User Deleted Successfully", users });
});

export const addShippingInfo = asyncHandler(async (req, res, next) => {
  const { shippingInfo } = req.body;
  const id = req.user._id;

  const user = await User.findByIdAndUpdate(
    id,
    { shippingInfo },
    { new: true }
  );

  if (!user) return next(new CustomError("user not found !! ", 404));

  res.status(200).json({
    success: true,
    shippingInfo: user.shippingInfo,
    user,
    message: "Shipping Details Updated Successfully",
  });
});
