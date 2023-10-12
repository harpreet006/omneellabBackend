const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehouseSecurity = sequelize.define("WarehouseSecurity", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  cctv: {
    type: DataTypes.STRING,
  },
  fireHydrant: {
    type: DataTypes.STRING,
  },
  fireSprinklers: {
    type: DataTypes.STRING,
  },
  smokeDetectorsAndFireAlarm: {
    type: DataTypes.STRING,
  },
  securityGuard: {
    type: DataTypes.STRING,
  },
  metalDetector: {
    type: DataTypes.STRING,
  },
  pestControl: {
    type: DataTypes.STRING,
  },
  others: {
    type: DataTypes.STRING,
  },
  waterTank: {
    type: DataTypes.JSON,
  },
  fireExtinguishers: {
    type: DataTypes.JSON,
  },
});

module.exports = WarehouseSecurity;
