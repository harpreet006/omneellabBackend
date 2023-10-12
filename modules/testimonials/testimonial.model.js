// models/testimonial.model.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../models/dbConfig");

const Testimonial = sequelize.define("Testimonial", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Define a nested user object within the Testimonial schema
  user: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
});

module.exports = Testimonial;
