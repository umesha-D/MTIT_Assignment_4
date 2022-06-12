const express = require("express");
const router = express.Router();
const { login, validatetoken } = require("../service/authenticationService");

router.post('/login', login);
router.post('/validatetoken', validatetoken);

module.exports = router;
