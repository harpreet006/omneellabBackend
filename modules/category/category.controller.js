const express = require("express");
const router = express.Router();

const categoryService = require("./category.service");

// Create a new category
router.post("/", categoryService.createNewCategory);

// Get all categories
router.get("/", categoryService.getCategoryList);

module.exports = router;
