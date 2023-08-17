import express from "express";
import { isAdmin, isAuthenticated } from "../utils/authUtils.js";
import {
  checkout,
  createOrder,
  deleteOrder,
  getAllOrdersAdmin,
  getOrderById,
  getOrdersofUser,
  paymentVerification,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/new").post(isAuthenticated, createOrder);

router
  .route("/:id")
  .get(isAuthenticated, getOrderById)
  .put(isAuthenticated, isAdmin, updateOrderStatus)
  .delete(isAuthenticated, isAdmin, deleteOrder);

router.route("/all/user").get(isAuthenticated, getOrdersofUser);
router.route("/all/admin").get(isAuthenticated, isAdmin, getAllOrdersAdmin);

//  Payment Routes

router.route("/checkout/instance").post(isAuthenticated, checkout);

router.route("/verify/payment").post(isAuthenticated, paymentVerification);

export default router;
