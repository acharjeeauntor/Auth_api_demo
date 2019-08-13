const Sequelize = require("sequelize");
const db = require("../config/keys");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    required: true,
    isLowercase: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    required: true
  }
});

module.exports = User;
