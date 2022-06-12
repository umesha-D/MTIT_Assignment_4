"use strict";

const Order = require("../model/order");
const {
  createOrderService,
  getOrderByIdService,
  deleteOrderService,
  updateOrderService,
  getAllOrdersService,
} = require("../service/order");

exports.getAllOrders = async (req, res) => {
  try {
    const result = await getAllOrdersService(req.query);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const result = await createOrderService(req.body, req.data);
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.getOrderById = async (req, res, next, id) => {
  try {
    const result = await getOrderByIdService(id, req.data);
    req.order = result;
    next();
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.getSingleOrder = (req, res) => {
  return res.json(req.order);
};

exports.deleteOrder = async (req, res) => {
  const order = req.order;
  try {
    const result = await deleteOrderService(order, req.data);
    res.json({
      message: "Order has been deleted",
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.updateOrder = async (req, res) => {
  const order = req.order;
  const body = req.body;

  try {
    const result = await updateOrderService(order, body, req.data);
    res.json({
      message: "Order has been updated successfully",
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.getPlaces = async() => {
  try {
    
  } catch (err) {
    
  }
}
