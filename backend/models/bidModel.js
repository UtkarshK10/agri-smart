import mongoose from "mongoose";

const bidSchema = mongoose.Schema(
  {
    contractorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    landId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Land",
    },
    bidAmt: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    approvedAt: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
