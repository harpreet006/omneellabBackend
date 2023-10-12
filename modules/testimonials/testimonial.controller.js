// routes/testimonial.routes.js

const express = require("express");
const router = express.Router();
const Testimonial = require("./testimonial.model");
const User = require("../user/user.model");

router.post("/", async (req, res) => {
  const { title, description, image, userId } = req.body; // Assuming userId is provided in the request body

  try {
    // Create the testimonial
    const testimonial = await Testimonial.create({
      title,
      description,
      image,
      userId, // Set the userId to associate the testimonial with a user
    });

    // Fetch the associated user's firstName and lastName
    const user = await User.findByPk(userId, {
      attributes: ["firstName", "lastName"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Add the user's firstName and lastName to the testimonial object
    testimonial.user = user;

    res.status(201).json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  // Calculate the offset based on page and limit
  const offset = (page - 1) * limit;

  try {
    const testimonials = await Testimonial.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
    });

    res.status(200).json({
      totalCount: testimonials.count,
      data: testimonials.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
