const Sequelize = require('sequelize');
const db = require('../db');
const { INTEGER } = Sequelize;

const LineItem = db.define('lineitem', {
  amount: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});

module.exports = LineItem;
