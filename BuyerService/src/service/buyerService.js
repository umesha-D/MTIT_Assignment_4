"use strict";

const Buyer = require("../model/buyer");
const { validateBuyer } = require("./buyerValidation");
const bcrypt = require("bcryptjs");

//adding buyer
const addBuyer = async (req, res) => {
  const buyer = req.body;
  let newBuyer = await validateBuyer(buyer);
  try {
    if (newBuyer === 0) {
      res.status(400).json({ msg: "Please Enter All Fields!" });
    } else if (newBuyer === 1) {
      res.status(400).json({ msg: "User Already Exists!" });
    } else {
      newBuyer = new Buyer(buyer);
      newBuyer.password = bcrypt.hashSync(newBuyer.password, 10);
      await newBuyer.save();
      res.status(201).json({ msg: "added" });
    }
  } catch (error) {
    res.status(400).json({ message: "Buyer Not Created!" });
  }
};

//retrieve all buyers
const getAllBuyers = async (req, res) => {
  try {
    const allBuyers = await Buyer.find();
    res.json(allBuyers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get buyer by id
const getBuyer = async (req, res) => {
  try {
    if (req.params.id != req.user._id) {
      throw new Error("Unauthorized access");
    } else {
      const currentBuyer = await Buyer.findById(req.params.id);
      res.json({currentBuyer});
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update buyer details
const updateBuyer = async (req, res) => {
  try {
    if (req.params.id != req.user._id) {
      throw new Error("Unauthorized access");
    } else {
      const currentBuyer = await Buyer.findById(req.params.id);
      currentBuyer.userName = req.body.userName;
      currentBuyer.email = req.body.email;
      currentBuyer.password = bcrypt.hashSync(req.body.password, 10);
      currentBuyer.phoneNumber = req.body.phoneNumber;
      currentBuyer.address = req.body.address;
      currentBuyer.profilePic = req.body.profilePic;
      await currentBuyer.save();
      res.status(201).json(currentBuyer);
    }
  } catch (error) {
    res.status(409).json({ msg: "No Such Buyer!" });
  }
};

//delete buyer
const deleteBuyer = async (req, res) => {
  try {
    if (req.params.id != req.user._id) {
      throw new Error("Unauthorized access");
    } else {
      const currentBuyer = await Buyer.findById(req.params.id);
      await currentBuyer.remove();
      res.status(201).json("deleted");
    }
  } catch (error) {
    res.status(409).json({ msg: "Could Not Delete!" });
  }
};

//adding items to cart
const addToCart = async function (req, res) {
  const productId = req.params.productId;
  const product = { productId: "Apple", qty: 1 };
  if (product) {
    //const cart = this.cart;
    const currentBuyer = await Buyer.findById(req.params.id);
    const { cart } = currentBuyer;
    const isExisting = cart.items.findIndex(
      (objInItems) =>
        new String(objInItems.productId).trim() ===
        new String(product.productId).trim()
    );
    if (isExisting >= 0) {
      cart.items[isExisting].qty += 1;
    } else {
      cart.items.push({ productId: product.productId, qty: 1 });
    }
    try {
      currentBuyer.save();
      res.status(201).json(currentBuyer);
    } catch (e) {
      res.status(409).json("failed");
    }
  }
};

//removing items from cart
const removeFromCart = async (req, res) => {
  const currentBuyer = await Buyer.findById(req.params.id);
  const { cart } = currentBuyer;
  const isExisting = cart.items.findIndex(
    (objInItems) =>
      new String(objInItems.productId).trim() === new String(productId).trim()
  );
  if (isExisting >= 0) {
    cart.items.splice(isExisting, 1);
    try {
      currentBuyer.save();
      res.status(201).json(currentBuyer);
    } catch (e) {
      res.status(409).json("failed");
    }
  }
};

module.exports.addToCart = addToCart;
module.exports.removeFromCart = removeFromCart;

module.exports.addBuyer = addBuyer;
module.exports.getAllBuyers = getAllBuyers;
module.exports.getBuyer = getBuyer;
module.exports.updateBuyer = updateBuyer;
module.exports.deleteBuyer = deleteBuyer;
