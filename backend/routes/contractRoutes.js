import express from "express";

import {
  addContract,
  getContractById,
  getContractorContracts,
  getFarmerContracts,
  getLandContract,
  updateContractToSettled,
} from "../controllers/contractController.js";
import { contractor, farmer, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, contractor, addContract);
router.route("/contractor").get(protect, contractor, getContractorContracts);
router.route("/farmer").get(protect, farmer, getFarmerContracts);
router.route("/:id").get(protect, getContractById);
router.route("/:id/settle").put(protect, farmer, updateContractToSettled);

router.route("/lands/:id").get(protect, farmer, getLandContract);

export default router;
