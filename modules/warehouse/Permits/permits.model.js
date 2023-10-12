const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehousePermits = sequelize.define("WarehousePermits", {
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

module.exports = WarehousePermits;
