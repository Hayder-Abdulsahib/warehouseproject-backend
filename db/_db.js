const Sequelize = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "P3la!las",
  database: "dev_db2",
  dialect: "postgres",
  host: "localhost",
  logging: false
});

module.exports = db;