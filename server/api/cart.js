const router = require("express").Router();
const {
	models: { Plant, Order, LineItem },
} = require("../db");
module.exports = router;

router.get("/:orderId", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;

		const cart = await Order.findByPk(orderId);
		const lineItems = await cart.getPlants();

		const data = {
			id: cart.id,
			plants: lineItems,
		};

		res.status(200).send(data);
	} catch (err) {
		next(err);
	}
});

router.put("/:orderId/:plantId/add", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const plantId = req.params.plantId;

		const order = await Order.findByPk(orderId);
		const plant = await Plant.findByPk(plantId);

		const lineItem = await LineItem.findOne({
			where: {
				orderId: orderId,
				plantId: plantId,
			},
		});

		if (lineItem) {
			lineItem.amount += 1;
			await lineItem.save();
		} else {
			await order.addPlant(plant);
		}

		const updatedCart = await order.getPlants();
		res.status(201).send(updatedCart);
	} catch (err) {
		next(err);
	}
});

router.put("/:orderId/:plantId/subtract", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const plantId = req.params.plantId;

		const order = await Order.findByPk(orderId);
		const plant = await Plant.findByPk(plantId);

		const lineItem = await LineItem.findOne({
			where: {
				orderId: orderId,
				plantId: plantId,
			},
		});

		if (lineItem.amount > 1) {
			lineItem.amount -= 1;
			await lineItem.save();
		} else {
			await order.removePlant(plant);
		}

		const updatedCart = await order.getPlants();
		res.status(201).send(updatedCart);
	} catch (err) {
		next(err);
	}
});

router.put("/:orderId/:plantId/remove", async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		const plantId = req.params.plantId;

		const order = await Order.findByPk(orderId);
		const plant = await Plant.findByPk(plantId);

		await order.removePlant(plant);

		const updatedCart = await order.getPlants();
		res.status(201).send(updatedCart);
	} catch (err) {
		next(err);
	}
});
