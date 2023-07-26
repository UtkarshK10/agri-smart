import mongoose from "mongoose";

const contractSchema = mongoose.Schema(
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
    contractAmt: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isSettled: {
      type: Boolean,
      required: true,
      default: false,
    },
    settledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
