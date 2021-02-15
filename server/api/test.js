// For testing purposes only - delete before deploying to prod

const router = require("express").Router();
const {
	models: { Plant, Order, LineItem },
} = require("../db");
module.exports = router;

router.get("/cartid", async (req, res, next) => {
	const data = await Order.findOne({
		where: {
			fullfilled: false,
		},
	});
	res.status(200).send(data.id);
});
