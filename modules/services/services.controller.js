const express = require("express");
const router = express.Router();

const ServicesService = require("./services.service");

// Create a new type (POST request)
router.get("/categories/homepage", ServicesService.getServiceCategories);

module.exports = router;
