const router = require("express").Router();
const {
	models: { Order },
} = require("../db");
module.exports = router;

const { stripeSecret, stripeEndpointSecret } = require("../../secrets");

const stripe = require("stripe")(stripeSecret);

// create stripe session
router.post("/create-stripe-session", async (req, res, next) => {
	const orderId = req.body.cartId;
	const order = await Order.findByPk(orderId);
	const lineItems = await order.getPlants();
	const stripeLineItems = lineItems.map((lineItem) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: lineItem.name,
					images: ["https://picsum.photos/200"],
				},
				unit_amount: lineItem.price * 100,
			},
			quantity: lineItem.lineitem.amount,
		};
	});

	const session = await stripe.checkout.sessions.create({
		client_reference_id: orderId,
		payment_method_types: ["card"],
		line_items: stripeLineItems,
		mode: "payment",
		success_url: `http://localhost:8080/account/orders?success=true`,
		cancel_url: `http://localhost:8080/cart?cancelled=true`,
	});

	res.status(201).send({ id: session.id });
});

// create stripe event handler
router.post("/create-stripe-webhook", async (req, res) => {
	const payload = req.body;

	if (payload.type === "checkout.session.completed") {
		const session = payload.data.object;
		const order = await Order.findByPk(session.client_reference_id);
		order.fullfilled = true;
		await order.save();
	}

	res.status(200);
});
