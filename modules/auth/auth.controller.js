const express = require("express");
const router = express.Router();
const authService = require("./auth.service");

router.post("/signup", authService.signUp);

router.post("/login", authService.login);

router.post("/resend", authService.resendOTP);

module.exports = router;
