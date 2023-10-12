const Sequelize = require("sequelize");

const dbConfig = require("./dbConfig");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = dbConfig;

module.exports = db;
