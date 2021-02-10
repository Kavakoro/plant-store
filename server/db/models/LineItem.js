const Sequelize = require("sequelize");
const db = require("../db");
const { DataTypes } = Sequelize;

const LineItem = db.define("lineitem", {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	amount: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		allowNull: false,
	},
});

module.exports = LineItem;
