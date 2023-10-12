const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehouseItInfra = sequelize.define("WarehouseItInfra", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  desktop: {
    type: DataTypes.STRING,
  },
  printer: {
    type: DataTypes.STRING,
  },
  printerMultifunction: {
    type: DataTypes.STRING,
  },
  upsAndInverter: {
    type: DataTypes.STRING,
  },
  broadBand: {
    type: DataTypes.STRING,
  },
  scanner: {
    type: DataTypes.STRING,
  },
  telephone: {
    type: DataTypes.STRING,
  },
  wms: {
    type: DataTypes.STRING,
  },
  others: {
    type: DataTypes.STRING,
  },
});

module.exports = WarehouseItInfra;
