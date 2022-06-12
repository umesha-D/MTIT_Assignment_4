const express = require("express");
const router = express.Router();
const validateToken = require('./../util/validateToken');
const { addBuyer, getBuyer, getAllBuyers, updateBuyer, deleteBuyer ,addToCart, removeFromCart } = require("../service/buyerService");

router.post('/addBuyer', addBuyer);
router.get('/getAllBuyers', getAllBuyers);
router.get('/getBuyer/:id', validateToken, getBuyer);
router.put('/updateBuyer/:id', validateToken, updateBuyer);
router.delete('/removeBuyer/:id', validateToken, deleteBuyer);
router.post('/add-to-cart/:id/:productId',validateToken, addToCart);
router.post('/remove-from-cart/:id/:productId',validateToken, removeFromCart);

module.exports = router;

//{"_id":{"$oid":"608e8cf621ec85416c39bab8"},"firstName":"Tom","lastName":"Jon","userName":"tomjon","password":"tom123","email":"tom@gmail.com","phoneNumber":"0768812527","address":{"houseNo":"45G","streetName":"Abc","city":"Ddddeg"},"createdAt":{"$date":{"$numberLong":"1619954934410"}},"updatedAt":{"$date":{"$numberLong":"1619954934410"}},"__v":{"$numberInt":"0"}}