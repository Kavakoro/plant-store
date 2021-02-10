const Sequelize = require('sequelize');
const db = require('../db');
// const { DataTypes, BOOLEAN, STRING, INTEGER } = Sequelize;
const { UUID, UUIDV4, BOOLEAN, STRING, INTEGER } = Sequelize;

const Order = db.define('order', {
  id: {
    //type: DataTypes.UUID,
    //defaultValue: Sequelize.UUIDV4,
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  shippingAddress: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullfilled: {
    type: BOOLEAN,
    defaultValue: false,
  },
  total: { type: INTEGER },
});

module.exports = Order;
