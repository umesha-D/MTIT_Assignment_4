const mongoose = require("mongoose");
const auth = require("./../model/auth");
const Buyer = require("../model/buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const emailValue = req.body.email;
  const password = req.body.password;

  try {
    const getUser = await Buyer.find({ email: emailValue });
    if (!getUser) {
      res.send("Invalid email");
    } else {
      const passwordCheck = bcrypt.compareSync(password, getUser[0].password);
      if (passwordCheck) {
        const token = jwt.sign(
          { _id: getUser[0]._id, email: getUser[0].email },
          process.env.TOKENSCRET,
          { expiresIn: "24h" }
        );
        res.send(token);
      } else {
        res.send("Invalid password");
      }
    }
  } catch (err) {
    res.send(err);
  }
};

const validatetoken = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    res.status(403).send("Token not provided");
  }

  jwt.verify(token, process.env.TOKENSCRET, function (err, decoded) {
    if (err) {
      res.status(403).json({ status: 403, err: err });
    } else {
      res.user = decoded;
      res.status(200).json({ status: 200, data: decoded });
    }
  });
};

module.exports.login = login;
module.exports.validatetoken = validatetoken;
