import asyncHandler from "express-async-handler";
import Produce from "../models/produceModel.js";

// @desc    Create a produce
// @route   POST /api/produce
// @access  Private/Farmer
const createProduce = asyncHandler(async (req, res) => {
  const produce = new Produce({
    name: "Sample name",
    price: 0,
    seller: req.user._id,
    image: "/images/sample.jpg",
    quantity: 0,
  });
  const createdProduce = await produce.save();
  res.status(201).json(createdProduce);
});

// @desc    Update a produce
// @route   PUT /api/produce/:id
// @access  Private/Farmer
const updateProduce = asyncHandler(async (req, res) => {
  const { name, price, image, quantity } = req.body;

  const produce = await Produce.findById(req.params.id);

  if (produce) {
    produce.name = name;
    produce.price = price;
    produce.image = image;
    produce.quantity = quantity;

    const updatedProduce = await produce.save();
    res.json(updatedProduce);
  } else {
    res.status(404);
    throw new Error("Produce not found");
  }
});

// @desc    Delete a produce
// @route   DELETE /api/produce/:id
// @access  Private/Admin
const deleteProduce = asyncHandler(async (req, res) => {
  const produce = await Produce.findById(req.params.id);

  if (produce) {
    await produce.remove();
    res.json({ message: "Produce removed" });
  } else {
    res.status(404);
    throw new Error("Produce not found");
  }
});

// @desc Get logged in user produce
// @route GET /api/produce/myproduces
// @acccess Private/Farmer
const getMyProduces = asyncHandler(async (req, res) => {
  const produces = await Produce.find({ seller: req.user._id, isPaid: false });
  res.json(produces);
});

// @desc Get logged in user produce purchases
// @route GET /api/produce/mypurchases
// @acccess Private/Contractor
const getMyPurchases = asyncHandler(async (req, res) => {
  const purchases = await Produce.find({
    buyer: req.user._id,
    isPaid: true,
  }).populate("seller", "name email");
  res.json(purchases);
});

// @desc Get logged in user sales
// @route GET /api/produce/mysales
// @acccess Private/Farmer
const getMySales = asyncHandler(async (req, res) => {
  const sales = await Produce.find({
    seller: req.user._id,
    isPaid: true,
  }).populate("buyer", "name email");
  res.json(sales);
});

// @desc    Update produce to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Farmer
const updateProduceToDelivered = asyncHandler(async (req, res) => {
  const produce = await Produce.findById(req.params.id);

  if (produce) {
    produce.isDelivered = true;
    produce.deliveredAt = Date.now();

    const updatedProduce = await produce.save();

    res.json(updatedProduce);
  } else {
    res.status(404);
    throw new Error("Produce not found");
  }
});

// @desc Get all produces
// @route GET /api/produce
// @acccess Private/Contractor
const getAllProduces = asyncHandler(async (req, res) => {
  const produces = await Produce.find({ isPaid: false }).populate(
    "seller",
    "name email"
  );
  res.json(produces);
});

// @desc Fetch single produce
// @route GET /api/produce/:id
// @acccess Private
const getProduceById = asyncHandler(async (req, res) => {
  const produce = await Produce.findById(req.params.id).populate(
    "seller",
    "name email"
  );
  if (produce) {
    res.json(produce);
  } else {
    res.status(404);
    throw new Error("Produce Not Found !");
  }
});

// @desc Update produce to paid
// @route PUT /api/produce/:id/pay
// @acccess Private/Contractor
const updateProduceToPaid = asyncHandler(async (req, res) => {
  const produce = await Produce.findById(req.params.id);
  const { shippingAddress, paymentResult } = req.body;

  if (produce) {
    produce.buyer = req.user._id;
    produce.shippingAddress = shippingAddress;
    produce.isPaid = true;
    produce.paidAt = Date.now();
    produce.paymentResult = paymentResult;
    const updatedProduce = await produce.save();
    res.json(updatedProduce);
  } else {
    res.status(404);
    throw new Error("Produce not found");
  }
});

export {
  createProduce,
  updateProduce,
  getProduceById,
  deleteProduce,
  getMyProduces,
  getAllProduces,
  updateProduceToPaid,
  getMyPurchases,
  getMySales,
  updateProduceToDelivered,
};
