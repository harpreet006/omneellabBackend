const express = require("express");
const router = express.Router();

const TypeService = require("./type.service");

// Create a new type (POST request)
router.post("/", TypeService.createNewType);

// Get all categories (GET request)
router.post("/all", TypeService.getTypeList);

module.exports = router;
