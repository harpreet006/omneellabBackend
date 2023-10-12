const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const verifyToken = require("../../middleware/verifyToken");

// OTP verification route
router.put("/phoneverify", userService.verifyOTP);

// get the user profile data
router.get("/userprofile", verifyToken, userService.getUserProfile);

router.put("/updatemobilewithnumber", userService.updateMobileNumber);

router.put("/forgotpassword", userService.forgotPassword);

router.put("/passwordchange", userService.passwordchange);

module.exports = router;
