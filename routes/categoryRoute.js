import {
  createCategory,
  deleteCategory,
  getCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import express from "express";
import { isAdmin, isAuthenticated } from "../utils/authUtils.js";
const router = express.Router();

router.route("/getAll").get(getCategory);
router.route("/create").post(isAuthenticated, isAdmin, createCategory);

router
  .route("/:id")
  .get(isAuthenticated, isAdmin, getOneCategory)
  .delete(isAuthenticated, isAdmin, deleteCategory)
  .put(isAuthenticated, isAdmin, updateCategory);

export default router;
