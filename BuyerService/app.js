'use strict';

const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());
env.config();

const PORT = process.env.PORT || 5005; 

//DB Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
  }, () => { console.log("Database connected") });

const buyerRoute = require('./src/controller/buyerController');
const authRoute = require('./src/controller/authenticationController');

app.listen(PORT, () => {
    console.log(`Buyer service started on port : ${PORT}`);
});

app.use('/api/buyers', buyerRoute);
app.use('/api/buyerauth', authRoute);
