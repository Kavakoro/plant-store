const Sequelize = require("sequelize");
const db = require("../db");
const { DataTypes } = Sequelize;

const Ledger = db.define("ledger", {
	amount: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		allowNull: false,
	},
});

module.exports = Ledger;
