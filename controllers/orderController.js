import { asyncHandler } from "../middlewares/asyncHandler.js";
import CustomError from "../config/CustomError.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { instance } from "../server.js";
import Payment from "../models/paymentModels.js";
import crypto from "crypto";

export const createOrder = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { cart, totalPrice, paymentId } = req.body;

  let items = [];
  for (let item of cart) {
    items.push({
      product: item.product._id,
      name: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
    });
  }

  const order = await Order.create({
    user: userId,
    totalPrice,
    items,
    payment: paymentId,
  });

  res.status(200).json({ success: true, order });
});

export const getOrdersofUser = asyncHandler(async (req, res, next) => {
  const id = req.user._id;

  let allOrders = await Order.find({ user: id }).sort({ date: -1 });

  res.status(200).json({ success: true, allOrders });
});

export const getAllOrdersAdmin = asyncHandler(async (req, res, next) => {
  let allOrders = await Order.find({}).sort({ date: -1 });

  res.status(200).json({ success: true, allOrders });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const order = await Order.findById(id);

  if (!order) return next(new CustomError("Order Not Found !!", 404));

  res.status(200).json({ success: true, order });
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const status = req.body;

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

  if (!order) return next(new CustomError("Order Not Found !!", 404));

  res.status(200).json({ success: true, order });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  await Order.findByIdAndDelete(id);

  const allOrders = await Order.find({}).sort({ date: -1 });

  res
    .status(200)
    .json({ success: true, message: "Order Deleted Successfully", allOrders });
});

//  Payments

export const checkout = asyncHandler(async (req, res, next) => {
  const { totalPrice } = req.body;

  const paymentOrder = await instance.orders.create({
    amount: Math.round(totalPrice * 100),
    currency: "INR",
  });

  res.status(200).json({ success: true, order: paymentOrder });
});

export const paymentVerification = asyncHandler(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  let payment;

  if (isAuthentic) {
    // Database comes here

    payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `${process.env.FRONTEND_URL}/shipping/success?ref=${razorpay_payment_id}&payId=${payment._id}`
    );
  }
});
