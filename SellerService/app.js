const express = require('express');
const env = require("dotenv");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
env.config();

const PORT = process.env.PORT || 5004; 

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}, () => { console.log("Database connected") });

const sellerRoute = require('./src/controller/sellerController');
const authRoute = require('./src/controller/authenticationController');

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));

app.use('/api/sellers', sellerRoute);
app.use('/api/sellerauth', authRoute);