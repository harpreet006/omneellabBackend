const { Sequelize } = require("sequelize");

// Define your database connection
const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: 5432,
});

module.exports = sequelize;
