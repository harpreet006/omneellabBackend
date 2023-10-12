// models/category.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../models/dbConfig"); // Assuming you're using Sequelize

const Category = sequelize.define("Category", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  categoryStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Category;
