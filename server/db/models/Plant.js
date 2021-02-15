const Sequelize = require('sequelize');
const db = require('../db');
const { STRING, INTEGER, BOOLEAN } = Sequelize;

const Plant = db.define('plant', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  size: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  light: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  difficulty: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  petFriendly: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  airCleaner: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  img: {
    type: STRING,
    allowNull: false,
    defaultValue: '/images/yellowcan.jpeg',
  },
  price: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  inventory: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Plant;
