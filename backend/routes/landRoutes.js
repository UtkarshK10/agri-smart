import express from "express";
import {
  createLand,
  deleteLand,
  getAllLands,
  getLandById,
  getMyLands,
  updateLand,
} from "../controllers/landController.js";
import { contractor, farmer, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, contractor, getAllLands)
  .post(protect, farmer, createLand);
router.route("/mylands").get(protect, getMyLands);
router
  .route("/:id")
  .get(getLandById)
  .delete(protect, farmer, deleteLand)
  .put(protect, farmer, updateLand);

export default router;
