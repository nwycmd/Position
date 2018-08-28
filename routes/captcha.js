const express = require('express');
const router = express.Router();
const Captch = require("../services/captcha.js");


router.get('/gencode',Captch.genCaptcha);

router.get('/verify',Captch.verifyCaptcha);

module.exports = router;
