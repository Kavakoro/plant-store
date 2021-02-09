import React from "react";
import { connect } from "react-redux";
import { updateCart } from "../store/cart";

//this button works just, call updateCart on cart redux but not hooked up yet.

const AddToCart = ({ orderId, plantId, quantity }) => {
  return (
    <button onClick={() => updateCart(orderId, plantId, quantity)}>
      Add To Cart
    </button>
  );
};

const mapDispatch = (dispatch, orderId, plantId, quantity) => {
  return {
    updateCart: (orderId, plantId, quantity) =>
      dispatch(updateCart(orderId, plantId, quantity)),
  };
};

export default connect((state) => state, mapDispatch)(AddToCart);
