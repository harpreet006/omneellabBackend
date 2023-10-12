const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehouseForm80 = sequelize.define("WarehouseForm80", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = WarehouseForm80;
