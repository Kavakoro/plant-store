import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Checkout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Checkout</h1>
				<ul className="lineItems">
					{this.props.cart.plants.map((plant) => {
						return (
							<li>
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
					<h2>Order Total:</h2>
				</div>
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
	return null;
};

export default connect(mapState, mapDispatch)(Checkout);
