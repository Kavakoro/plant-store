import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { checkout } from '../store/cart';
import stripePublicKey from '../../secrets';

import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51IKvwUChsJVQ70ihrQt8gz8thYCRD5tytJ1Cdfm71Lz7LWKhXChHrZehBApoY21VjDhnr6pBMibULXqRVNHC3bBY00uRrV2W4w'
);

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const stripe = await stripePromise;
    const response = await axios.post('/api/checkout/create-stripe-session', {
      cartId: this.props.cart.id,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });
  }

  render() {
    return (
      <div>
        <h1>Review Your Cart</h1>
        {this.props.cart.plants.map((plant) => {
          return (
            <div className="lineItem" key={plant.id}>
              <img src={plant.img} />
              <div className="content">
                <span className="title">{plant.name}</span>
                <span className="price">{`Price: $${plant.price}`}</span>
                <span className="amount">{`x${plant.lineitem.amount}`}</span>
              </div>
            </div>
          );
        })}
        <Button
          type="button"
          id="checkout-button"
          role="link"
          onClick={this.handleClick}
        >
          Checkout
        </Button>
      </div>
    );
  }
}

/* 
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
			address: {
				street: "",
				city: "",
				state: "",
				zip: "",
			},
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(ev) {
		this.setState({
			address: { ...this.state.address, [ev.target.name]: ev.target.value },
		});
	}

	handleSubmit() {
		console.log("clicked");
		const _address = `${this.state.address.street} ${this.state.address.city}, ${this.state.address.state} ${this.state.address.zip}`;
		const _orderId = this.props.cart.id;
		this.props.confirmPurchase(_orderId, _address);
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
				<h2>Order Total: {this.state.totalPrice}</h2>
				<form>
					<Input
						type="text"
						name="street"
						placeholder="Street Address"
						onChange={this.handleChange}
						value={this.state.address.street}
					/>
					<Input
						type="text"
						name="city"
						placeholder="City"
						onChange={this.handleChange}
						value={this.state.address.city}
					/>
					<Input
						type="text"
						name="state"
						placeholder="State"
						onChange={this.handleChange}
						value={this.state.address.state}
					/>
					<Input
						type="text"
						name="zip"
						placeholder="ZIP Code"
						onChange={this.handleChange}
						value={this.state.address.zip}
					/>
				</form>
				<Button variant="contained" onClick={this.handleSubmit}>
					Confirm Purchase
				</Button>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		cart: state.cart,
	};
};

const mapDispatch = (dispatch) => {
	return {
		confirmPurchase: (orderId, address) => dispatch(checkout(orderId, address)),
	};
}; */

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Checkout);
