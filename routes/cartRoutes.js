import express from "express";
import { isAdmin, isAuthenticated } from "../utils/authUtils.js";
import {
  addToCart,
  deleteCartItem,
  loadCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.route("/add").put(isAuthenticated, addToCart);
router.route("/get_all").get(isAuthenticated, loadCart);

router.route("/:id").delete(isAuthenticated, deleteCartItem);

export default router;
