const router = require("express").Router();
const {
	models: { Plant, Order, LineItem, User },
} = require("../db");
module.exports = router;

const bodyParser = require("body-parser");

const { stripeSecretKey } = require("../../secrets");
const endpointSecret = "whsec_01zvkW88xuwsN7wlVggkK8O9JKsXzWSE";

const stripe = require("stripe")(stripeSecretKey);

// create stripe session
router.post("/create-stripe-session", async (req, res, next) => {
	const order = await Order.findByPk(req.body.cartId);
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
		payment_method_types: ["card"],
		line_items: stripeLineItems,
		mode: "payment",
		success_url: `http://localhost:8080/cart?success=true`,
		cancel_url: `http://localhost:8080?cancelled=true`,
	});

	res.status(201).send({ id: session.id });
});

// create stripe event handler
router.post("/create-stripe-webhook", (req, res) => {
	const payload = req.body;
	const sig = request.headers["stripe-signature"];

	let event;

	try {
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
	} catch (err) {
		return response.status(400).send(`Webhook Error: ${err.message}`);
	}

	res.status(200);
});
