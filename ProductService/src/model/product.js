"use strict";
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 100,
  },
  discription: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  category: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  images: {
    type: [String],
    required: false
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  addedAt: {
    type: Date,
    required: true 
  },
  updatedAt: {
    type: Date,
    required: false    
  },
  ownerRef: {
    type: String,
    required: true,
    min: 1,
    max: 255
  },
});

module.exports = mongoose.model("Product", productSchema);