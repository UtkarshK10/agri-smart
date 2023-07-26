import mongoose from "mongoose";

const landSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      reuired: true,
      ref: "User",
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    crop: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
      default: 0,
    },
    minBidAmt: {
      type: Number,
      required: true,
      default: 0,
    },
    estProd: {
      type: Number,
      required: true,
      default: 0,
    },
    // capitalReturn: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    isTransacted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Land = mongoose.model("Land", landSchema);
export default Land;
