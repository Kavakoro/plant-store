import React from "react";
import "../../public/Cart.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart, updateCart, createCart, deleteItem } from "../store/cart";
import auth from "../store/auth";
import { loadStripe } from "@stripe/stripe-js";
import { TextField } from "@material-ui/core";

import axios from "axios";

const stripePromise = loadStripe(
	"pk_test_51IKvwUChsJVQ70ihrQt8gz8thYCRD5tytJ1Cdfm71Lz7LWKhXChHrZehBApoY21VjDhnr6pBMibULXqRVNHC3bBY00uRrV2W4w"
);

class Cart extends React.Component {
	constructor(props) {
		super(props);
		// form state
		this.state = {
			shipTo: "",
			streetAddress: "",
			city: "",
			state: "",
			zipCode: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.getSubtotal = this.getSubtotal.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	getSubtotal() {
		const { plants } = this.props.cart;
		if (plants.length) {
			return plants
				.map((plant) => plant.price * plant.lineitem.amount)
				.reduce((a, b) => a + b)
				.toFixed(2);
		}
	}

	handleChange(ev) {
		this.setState({
			...this.state,
			[ev.target.id]: ev.target.value,
		});
	}

	async handleClick() {
		await axios.put(`/api/cart/${this.props.cart.id}/shipping`, this.state);
		const stripe = await stripePromise;
		const response = await axios.post("/api/checkout/create-stripe-session", {
			cartId: this.props.cart.id,
		});
		const result = await stripe.redirectToCheckout({
			sessionId: response.data.id,
		});
	}

	componentDidMount() {
		const cart = this.props.cart;
		if (!cart) {
			const orderId = window.localStorage.getItem("orderId");
			this.props.getCart(orderId, this.props.auth.id);
		}
	}

	render() {
		const { shipTo, streetAddress, city, state, zipCode } = this.state;
		const { cart } = this.props;
		const { plants } = cart;
		const orderId = cart.id;

		if (!plants.length) {
			return (
				<div id="cart">
					<p>Your cart is empty!</p>
				</div>
			);
		} else {
			return (
				<div id="cart">
					<div id="cart-wrapper">
						<h1>Your Cart</h1>

						{plants.map((plant, idx) => (
							<div id="cart-items" key={idx}>
								<img src={plant.img} />
								<div id="cart-details" className="row">
									<div className="column space-between">
										<div>
											<Link to={`/plants/${plant.id}`}>
												<h1>{plant.name}</h1>
											</Link>
										</div>
										<div>
											<strong>
												<span
													onClick={() =>
														this.props.updateCart(
															orderId,
															plant.id,
															plant.lineitem.amount - 1
														)
													}
												>
													-{" "}
												</span>
											</strong>
											<input
												readOnly={true}
												value={plant.lineitem.amount}
												type="number"
											/>
											<strong>
												<span
													onClick={() =>
														this.props.updateCart(
															orderId,
															plant.id,
															plant.lineitem.amount + 1
														)
													}
												>
													+{" "}
												</span>
											</strong>
										</div>
									</div>
									<div className="column space-between">
										<span>${plant.price.toFixed(2)}</span>
										<button
											onClick={() => this.props.deleteItem(orderId, plant.id)}
											className="remove"
										>
											REMOVE
										</button>
									</div>
								</div>
							</div>
						))}
						<hr></hr>
						<div className="subtotal">
							<strong>
								<span>Order Subtotal: </span>
							</strong>
							<span>${this.getSubtotal()}</span>
						</div>
						<div className="checkout">
							<h3>Shipping Address</h3>
							<form>
								<TextField
									id="shipTo"
									label="Name"
									value={shipTo}
									onChange={this.handleChange}
								></TextField>
								<TextField
									id="streetAddress"
									label="Street Address"
									value={streetAddress}
									onChange={this.handleChange}
								></TextField>
								<TextField
									id="city"
									label="City"
									value={city}
									onChange={this.handleChange}
								></TextField>
								<TextField
									id="state"
									label="State"
									value={state}
									onChange={this.handleChange}
								></TextField>
								<TextField
									id="zipCode"
									label="ZIP Code"
									value={zipCode}
									onChange={this.handleChange}
								></TextField>
							</form>
							<button
								type="button"
								id="checkout-button"
								role="link"
								onClick={this.handleClick}
							>
								Checkout
							</button>

							{/* <Link to="/cart/checkout">
                <button>CHECKOUT</button>
              </Link> */}
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapDispatch = (dispatch) => {
	return {
		getCart: (orderId) => dispatch(fetchCart(orderId, userId)),
		updateCart: (orderId, plantId, amount) =>
			dispatch(updateCart(orderId, plantId, amount)),
		createCart: (userId) => dispatch(createCart(userId)),
		deleteItem: (orderId, plantId) => dispatch(deleteItem(orderId, plantId)),
	};
};

export default connect((state) => state, mapDispatch)(Cart);
