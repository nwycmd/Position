const express = require('express');
const router = express.Router();
const UserService = require("../services/user_service.js");

router.post('/login',UserService.login);

router.post('/register',UserService.register);

module.exports = router;
