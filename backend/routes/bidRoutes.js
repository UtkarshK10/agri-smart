import express from "express";
import {
  addBid,
  getBidById,
  getContractorBids,
  getFarmerBids,
  getLandBids,
  updateBidToApproved,
  updateBidToPaid,
} from "../controllers/bidController.js";

import { contractor, farmer, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, contractor, addBid);
router.route("/farmerBids").get(protect, farmer, getFarmerBids);
router.route("/contractorBids").get(protect, contractor, getContractorBids);
router.route("/:id").get(protect, getBidById);
router.route("/:id/approve").put(protect, farmer, updateBidToApproved);
router.route("/:id/pay").put(protect, contractor, updateBidToPaid);
router.route("/landBids/:id").get(protect, farmer, getLandBids);

export default router;
