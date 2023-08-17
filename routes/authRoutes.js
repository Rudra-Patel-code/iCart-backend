import express from "express";
import {
  addShippingInfo,
  changeRole,
  deleteUser,
  getAllUsers,
  loginController,
  logout,
  myUserData,
  registerController,
  testRouter,
} from "../controllers/authController.js";

import { isAdmin, isAuthenticated } from "../utils/authUtils.js";

const router = express.Router();

// Register - POST
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/my-data").get(isAuthenticated, myUserData);
router.route("/logout").get(isAuthenticated, logout);
router.route("/test").get(isAuthenticated, isAdmin, testRouter);

router.route("/change-role").put(isAuthenticated, isAdmin, changeRole);

router.route("/getAll").get(isAuthenticated, isAdmin, getAllUsers);

router.route("/:id").delete(isAuthenticated, isAdmin, deleteUser);

router.route("/save/shipping").put(isAuthenticated, addShippingInfo);

export default router;
