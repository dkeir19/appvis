import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";

import {
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router.route("/:id").get(getProductById);

export default router;
