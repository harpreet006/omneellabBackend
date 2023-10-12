const { DataTypes } = require("sequelize");
const sequelize = require("../../models/dbConfig");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  pinCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  area: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
  },
  countryCode: {
    type: DataTypes.STRING,
  },
  referredCode: {
    type: DataTypes.STRING,
  },
  isTermAndCondition: {
    type: DataTypes.BOOLEAN,
  },
  userType: {
    type: DataTypes.STRING,
  },
  roleId: {
    type: DataTypes.INTEGER,
  },
  otp: {
    type: DataTypes.INTEGER,
  }, // Store the generated OTP
  isOtpVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  passwordChangeCode: {
    type: DataTypes.INTEGER,
  },
});

module.exports = User;
