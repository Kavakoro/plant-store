const router = require("express").Router();
const {
	models: { Plant, Order, LineItem, User },
} = require("../db");
module.exports = router;

const { stripeSecretKey } = require("../../secrets");

/* const stripe = require("stripe")(
	"sk_test_51IKvwUChsJVQ70ih6fsb1mJTZfAeY67EQhAj91kfZM6mGE7UgJB0448s6DSUmvPkzgTrCESraG2QqdfjuvlmfQj700HvZUgJdz"
); */

const stripe = require("stripe")(stripeSecretKey);

//add to cart
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

	/* const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: "Stubborn Attachments",
						images: ["https://i.imgur.com/EHyR2nP.png"],
					},
					unit_amount: 2000,
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `http://localhost:8080`,
		cancel_url: `http://localhost:8080`,
	}); */

	res.status(201).send({ id: session.id });
});
