const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER, UUID } = Sequelize;

const LineItem = db.define("lineitem", {
	id: {
		type: UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	amount: {
		type: INTEGER,
		defaultValue: 1,
		allowNull: false,
	},
});

module.exports = LineItem;
