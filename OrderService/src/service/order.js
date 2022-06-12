"use strict";

const Order = require("../model/order");
const { validateOrder } = require("../validation/index");

exports.createOrderService = (order_item, payload) => {
  return new Promise((resolve, reject) => {
    const order = new Order(order_item);
    if (order_item.customer.email !== payload.email) {
      reject("Invalid access");
    } else {
      const validate = validateOrder(order);
      if (validate.error !== undefined) {
        console.log("v error");
        reject(validate.error.details[0].message);
      }
      order.save((err, order) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(order);
        }
      });
    }
  });
};

exports.getOrderByIdService = (id, payload) => {
  return new Promise((resolve, reject) => {
    if (order_item.customer.email !== payload.email) {
      reject("Invalid access");
    } else {
      Order.findById(id).exec((err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    }
  });
};

exports.deleteOrderService = (order, payload) => {
  return new Promise((resolve, reject) => {
    if (order_item.customer.email !== payload.email) {
      reject("Invalid access");
    } else {
      order.remove((err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    }
  });
};

exports.updateOrderService = (order, body, payload) => {
  return new Promise((resolve, reject) => {
    if (order_item.customer.email !== payload.email) {
      reject("Invalid access");
    } else {
      order.customer = body.customer;
      order.amount = body.amount;
      order.items = body.items;
      order.billing = body.billing;
      order.save((err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    }
  });
};

exports.getAllOrdersService = (query) => {
  return new Promise((resolve, reject) => {
    let sortBy = query.sortBy ? query.sortBy : "_id";
    let orderBy = query.orderBy ? query.orderBy : "asc";
    let limit = query.limit ? query.limit : 100;

    Order.find()
      .limit(limit)
      .exec((err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
  });
};
