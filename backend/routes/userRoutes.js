import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  watchList,
  watchListRemove
} from "../controllers/userController.js";
router.post("/watchlist", watchList);
router.post("/watchlistremove", watchListRemove);
router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

  


export default router;
