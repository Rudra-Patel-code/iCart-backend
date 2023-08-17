import { asyncHandler } from "../middlewares/asyncHandler.js";
import CustomError from "../config/CustomError.js";
import User from "../models/userModel.js";
import Products from "../models/productModel.js";

import Cart from "../models/cartModel.js";

export const addToCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;

  let cartItem = await Cart.findOne({ user: userId, product: productId });
  let newItem = false;

  // const product

  if (cartItem) {
    return next(new CustomError("Item Already in Cart", 400));
  } else {
    await Cart.create({ user: userId, product: productId });
    newItem = await Cart.findOne({ user: userId, product: productId }).populate(
      "product"
    );
  }

  res
    .status(200)
    .json({ success: true, message: "Product Added Successfully", newItem });
});

export const loadCart = asyncHandler(async (req, res, next) => {
  const id = req.user._id;

  const cartItems = await Cart.find({ user: id }).populate("product");

  res.status(200).json({ success: true, cartItems });
});

export const deleteCartItem = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;

  await Cart.findByIdAndDelete(id);

  const cart = await Cart.find({ user: userId }).populate("product");

  res
    .status(202)
    .json({ success: true, message: "Cart Item Deleted Successfully", cart });
});
