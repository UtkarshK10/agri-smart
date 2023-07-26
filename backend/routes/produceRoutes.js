import express from "express";
import {
  createProduce,
  deleteProduce,
  getAllProduces,
  getMyProduces,
  getMyPurchases,
  getMySales,
  getProduceById,
  updateProduce,
  updateProduceToDelivered,
  updateProduceToPaid,
} from "../controllers/produceController.js";
const router = express.Router();

import {
  admin,
  contractor,
  farmer,
  protect,
} from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, contractor, getAllProduces)
  .post(protect, farmer, createProduce);
router.route("/myproduces").get(protect, farmer, getMyProduces);
router.route("/mypurchases").get(protect, contractor, getMyPurchases);
router.route("/mysales").get(protect, farmer, getMySales);
router
  .route("/:id")
  .put(protect, farmer, updateProduce)
  .delete(protect, farmer, deleteProduce)
  .get(protect, getProduceById);

router.route("/:id/pay").put(protect, contractor, updateProduceToPaid);
router.route("/:id/deliver").put(protect, farmer, updateProduceToDelivered);

export default router;
