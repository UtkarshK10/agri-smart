import asyncHandler from "express-async-handler";
import Bid from "../models/bidModel.js";
import Land from "../models/landModel.js";

// @desc Create new bid
// @route POST /api/bids
// @acccess Private
const addBid = asyncHandler(async (req, res) => {
  const { farmerId, landId, bidAmt } = req.body;

  const bid = new Bid({
    contractorId: req.user._id,
    farmerId,
    landId,
    bidAmt,
  });

  const createdBid = await bid.save();

  res.status(201).json(createdBid);
});

// @desc Get bid by ID
// @route GET /api/bids/:id
// @acccess Private
const getBidById = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id)
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  if (bid) {
    res.json(bid);
  } else {
    res.status(404);
    throw new Error("Bid not found");
  }
});

// @desc    Update bid to approved
// @route   GET /api/bids/:id/approve
// @access  Private/Farmer
const updateBidToApproved = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);

  if (bid) {
    bid.isApproved = true;
    bid.approvedAt = Date.now();

    const updatedBid = await bid.save();
    await Bid.updateMany({ landId: bid.landId }, { isActive: false });
    await Land.findByIdAndUpdate(bid.landId, { isTransacted: true });

    res.json(updatedBid);
  } else {
    res.status(404);
    throw new Error("Bid not found");
  }
});

// @desc Update bid to paid
// @route PUT /api/bids/:id/pay
// @acccess Private/Contractor
const updateBidToPaid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);

  if (bid) {
    bid.isPaid = true;
    bid.paidAt = Date.now();
    bid.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedBid = await bid.save();
    res.json(updatedBid);
  } else {
    res.status(404);
    throw new Error("Bid not found");
  }
});

// @desc Get logged in farmer bids
// @route GET /api/bids/farmerBids
// @acccess Private/farmer
const getFarmerBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ farmerId: req.user._id })
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  res.json(bids);
});

// @desc Get logged in contractor bids
// @route GET /api/bids/contractorBids
// @acccess Private/contractor
const getContractorBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ contractorId: req.user._id })
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  res.json(bids);
});

// @desc Get all bids on a land
// @route GET /api/bids/landBids/:id
// @acccess Private
const getLandBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ landId: req.params.id })
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  res.json(bids);
});

export {
  addBid,
  getBidById,
  updateBidToApproved,
  updateBidToPaid,
  getFarmerBids,
  getContractorBids,
  getLandBids,
};
