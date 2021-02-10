const Sequelize = require("sequelize");
const db = require("../db");
const { DataTypes } = Sequelize;

const Order = db.define("order", {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	fulfilled: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
});

module.exports = Order;
