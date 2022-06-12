"use strict";

const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

//db connection
const DBConnection = require("./src/repository/DBConnection");
//routes
const productRoute = require("./src/controller/productController");

const PORT = process.env.PORT || 5002;

//enable environment varbiables file
env.config();

//app middlewares
app.use(express.json());
app.use(cors());

//create DB connection
DBConnection(io);

//route middlewares
app.use("/api/products", productRoute);

io.on("connection", () => {
  console.log("A new connection has been established");
});
server.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
