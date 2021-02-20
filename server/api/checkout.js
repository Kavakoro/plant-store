const router = require("express").Router();

const {
	models: { Order },
} = require("../db");
module.exports = router;

const _domain = process.env.PORT
	? "http://www.kavakoro.com"
	: "http://localhost:8080";

const stripeSecret =
	"sk_test_51IKvwUChsJVQ70ih6fsb1mJTZfAeY67EQhAj91kfZM6mGE7UgJB0448s6DSUmvPkzgTrCESraG2QqdfjuvlmfQj700HvZUgJdz";

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
					images: [`http://kavakoro.com${lineItem.img}`],
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
		success_url: `${_domain}/account/orders?success=true`,
		cancel_url: `${_domain}/cart?cancelled=true`,
	});

	res.status(201).send({ id: session.id });
});

// create stripe event handler
router.post("/create-stripe-webhook", async (req, res) => {
	const payload = req.body;

	res.sendStatus(200);

	if (payload.type === "checkout.session.completed") {
		const session = payload.data.object;
		const order = await Order.findByPk(session.client_reference_id);
		order.fullfilled = true;
		order.total = session.amount_total * 0.01;
		await order.save();
	}

	// res.status(200);
});
