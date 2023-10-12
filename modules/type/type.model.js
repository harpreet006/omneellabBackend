// models/category.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../models/dbConfig");

const WarehouseType = sequelize.define("WarehouseType", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  typeStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = WarehouseType;
