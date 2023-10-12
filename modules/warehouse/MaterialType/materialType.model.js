const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const WarehouseMaterialTypes = sequelize.define("WarehouseMaterialTypes", {
  warehouseId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  dryMaterial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  wetMaterial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  agriAndAlliedIndustries: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  autoMobiles: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  autoComponents: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  aviation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  consumerDurables: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  ecommerce: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  educationRelated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  engineeringGoods: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fmcg: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  healthAndPharma: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  itAndItes: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  manufacturing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  mediaAndEntertainment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  oilAndGas: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  power: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  renewableEnergy: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  retail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  scienceAndTechnology: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  steel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  telecommunication: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  textTiles: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tourismAndHospitality: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  prominentCustomersInTheWarehouse: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  checicalsDry: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  chemicalsWet: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = WarehouseMaterialTypes;
