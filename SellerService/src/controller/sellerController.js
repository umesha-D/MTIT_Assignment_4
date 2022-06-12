const express = require("express");
const { addSeller, getSellerById, updateSeller, deleteSeller, viewAll } = require("../service/sellerService");
const validateToken = require('./../util/validateToken');
const router = express.Router();

router.post('/add', addSeller);

router.get('/view/:id', validateToken, getSellerById);

router.put('/update/:id', validateToken, updateSeller);

router.delete('/delete/:id', validateToken, deleteSeller);

router.get('/viewall'  ,viewAll);

module.exports = router;