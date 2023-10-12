const { DataTypes } = require("sequelize");
const sequelize = require("../../../models/dbConfig");

const Category = require("../../category/category.model");
const Type = require("../../type/type.model");
const WarehouseContact = require("../warehouseContact/warehouseContact.model");
const WarehouseAddress = require("../warehouseContact/warehouseAddress.model");

const Warehouse = sequelize.define("Warehouse", {
  warehouseName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gstCertificate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalArea: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  structureType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  workingHour: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pallet: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vendorStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Draft",
  },
  adminStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  creatorUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Warehouse.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Warehouse.belongsTo(Type, {
  foreignKey: "typeId",
  as: "type",
});

module.exports = Warehouse;
