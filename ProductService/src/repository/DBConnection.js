"use strict";

const mongoose = require("mongoose");
const Product = require("./../model/product");

const DBConnection = (io) => {
  mongoose.connect(
    process.env.DATABASE_CREDENTIALS,
    { useNewUrlParser: true },
    function (err) {
      if (err) {
        throw err;
      }
      console.log("Database connected");

      io.on("connection", (socket) => {
        console.log("user connected");
      });

      Product.watch().on("change", (change) => {
        console.log("Something has changed");
        io.sockets.emit("dbupdated", change.fullDocument); 
      });
    }
  );
};

module.exports = DBConnection;
