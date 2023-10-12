const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehouseStorageSpace = sequelize.define("WarehouseStorageSpace", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  storageType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loadingAndUnloadingBays: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  palletsOnFloor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parkingArea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalArea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noOfShift: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  racks: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  availableSpaces: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  floors: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  totalAvailableSpace: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dockSize: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = WarehouseStorageSpace;
