import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { checkout } from "../store/cart";
import stripePublicKey from "../../secrets";
import "../../public/Checkout.css";

import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IKvwUChsJVQ70ihrQt8gz8thYCRD5tytJ1Cdfm71Lz7LWKhXChHrZehBApoY21VjDhnr6pBMibULXqRVNHC3bBY00uRrV2W4w"
);

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const stripe = await stripePromise;
    const response = await axios.post("/api/checkout/create-stripe-session", {
      cartId: this.props.cart.id,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });
  }

  render() {
    return (
      <div className="checkout">
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

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Checkout);
