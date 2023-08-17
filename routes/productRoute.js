import express from "express";
import uploadMiddlware from "../middlewares/imageConfig.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateAndCreateReview,
  updateProduct,
  updateProductImage,
} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../utils/authUtils.js";
const router = express.Router();

router
  .route("/create")
  .post(isAuthenticated, isAdmin, uploadMiddlware, createProduct);

router.route("/get_all").get(getAllProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct)
  .put(isAuthenticated, isAdmin, updateProduct);

router
  .route("/update/image/:id")
  .put(isAuthenticated, isAdmin, uploadMiddlware, updateProductImage);

router.route("/review/:id").put(isAuthenticated, updateAndCreateReview);

export default router;
