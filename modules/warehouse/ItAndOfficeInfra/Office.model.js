const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehouseOfficeInfra = sequelize.define("WarehouseOfficeInfra", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  area: {
    type: DataTypes.STRING,
  },
  airConditioner: {
    type: DataTypes.STRING,
  },
  workStations: {
    type: DataTypes.STRING,
  },
  chairs: {
    type: DataTypes.STRING,
  },
  cabins: {
    type: DataTypes.STRING,
  },
  tables: {
    type: DataTypes.STRING,
  },
  meetingRooms: {
    type: DataTypes.STRING,
  },
  recordRooms: {
    type: DataTypes.STRING,
  },
  strongRooms: {
    type: DataTypes.STRING,
  },
  securityGuardOfficeTable: {
    type: DataTypes.STRING,
  },
  electricLoad: {
    type: DataTypes.STRING,
  },
  others: {
    type: DataTypes.STRING,
  },
});

module.exports = WarehouseOfficeInfra;
