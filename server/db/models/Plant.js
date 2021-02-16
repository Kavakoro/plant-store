const Sequelize = require('sequelize');
const db = require('../db');
const { STRING, INTEGER, BOOLEAN } = Sequelize;

const Plant = db.define('plant', {
  name: {
    type: STRING,
    unique: true,
  },
  description: {
    type: STRING,
  },
  size: {
    type: INTEGER,
  },

  light: {
    type: INTEGER,
  },
  difficulty: {
    type: INTEGER,
  },
  petFriendly: {
    type: STRING,
  },
  airCleaner: {
    type: STRING,
  },
  img: {
    type: STRING,
    allowNull: false,
    defaultValue: '/images/yellowcan.jpeg',
  },
  price: {
    type: INTEGER,
  },
  inventory: {
    type: INTEGER,
  },
});

module.exports = Plant;
