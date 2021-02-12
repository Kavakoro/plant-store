import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import axios from "axios";

class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalPrice: this.props.cart.plants.reduce((acc, curr) => {
				const plantPrice = curr.price;
				const plantAmount = curr.lineitem.amount;
				const subTotal = curr.price * plantAmount;
				return acc + subTotal;
			}, 0),
		};
	}

	async componentDidMount() {
		// Update total price from server
		const totalPrice = (
			await axios.get(`/api/cart/${this.props.cart.id}/total`)
		).data;
		this.setState(totalPrice);
	}

	render() {
		// console.log(this.state);
		return (
			<div>
				<h1>Checkout</h1>
				<ul className="lineItems">
					{this.props.cart.plants.map((plant) => {
						return (
							<li key={`plant-${plant.id}`}>
								<div>
									<img src={plant.img} />
								</div>
								<div>
									<Link to={`/plants/${plant.id}`}>{plant.name}</Link>
								</div>
								<div>x {plant.lineitem.amount}</div>
								<div>{plant.price * plant.lineitem.amount}</div>
							</li>
						);
					})}
				</ul>
				<div>
					<h2>Order Total: {this.state.totalPrice}</h2>
				</div>
				<Button variant="contained">Confirm Purchase</Button>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		cart: state.cart,
	};
};

const mapDispatch = () => {
	return {};
};

export default connect(mapState, mapDispatch)(Checkout);
