const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const Warehouse = require("../newWarehouse/warehouse.model");

const WarehouseAddress = sequelize.define("WarehouseAddress", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  line1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  line2: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
  },
  landmark: {
    type: DataTypes.STRING,
  },
  pinCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longnitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = WarehouseAddress;
