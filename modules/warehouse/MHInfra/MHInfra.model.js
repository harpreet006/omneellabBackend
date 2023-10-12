const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehouseMHInfra = sequelize.define("WarehouseMHInfra", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  pickingTrolley: {
    type: DataTypes.STRING,
  },
  hydraulicDockLevler: {
    type: DataTypes.STRING,
  },
  batteryOperatedPalletTruck: {
    type: DataTypes.STRING,
  },
  handPalletTruck: {
    type: DataTypes.STRING,
  },
  electricStacker: {
    type: DataTypes.STRING,
  },
  shrinkAndStretchWrapMachine: {
    type: DataTypes.STRING,
  },
  others: {
    type: DataTypes.STRING,
  },
  pallets: {
    type: DataTypes.JSON,
  },
  weighingMachine: {
    type: DataTypes.JSON,
  },
  forkLiftsYes: {
    type: DataTypes.JSON,
  },
  forkLiftsDieselYes: {
    type: DataTypes.JSON,
  },
  hydraCrane: {
    type: DataTypes.JSON,
  },
});

module.exports = WarehouseMHInfra;
