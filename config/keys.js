const Sequelize = require("sequelize");

module.exports = new Sequelize("api_auth_demo", "root", "10047", {
  dialect: "mysql",
  host: "localhost",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
