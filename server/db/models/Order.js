const Sequelize = require('sequelize');
const db = require('../db');
// const { DataTypes, BOOLEAN, STRING, INTEGER } = Sequelize;
const { UUID, UUIDV4, BOOLEAN, STRING, INTEGER } = Sequelize;

const Order = db.define('order', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  streetAddress: {
    type: STRING,
    allowNull: true,
  },
  city: {
    type: STRING,
    allowNull: true,
  },
  state: {
    type: STRING,
    allowNull: true,
  },
  zipCode: {
    type: STRING,
    allowNull: true,
  },
  fullfilled: {
    type: BOOLEAN,
    defaultValue: false,
  },
  total: { type: INTEGER },
});

module.exports = Order;
