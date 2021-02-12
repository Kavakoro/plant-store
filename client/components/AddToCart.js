import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store/cart';
import Button from '@material-ui/core/Button';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { open: false };
  }
  handleClick() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const { cart, plantId, addToCart } = this.props;
    const orderId = cart.id;
    const { open } = this.state;
    const { handleClose, handleClick } = this;
    return (
      <>
        <Button
          variant="contained"
          onClick={() => {
            addToCart(orderId, plantId);
            handleClick();
          }}
        >
          Add To Cart
        </Button>
        <Snackbar
          style={{ padding: '2rem' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          open={open}
          message="Plant added to cart!"
          autoHideDuration={2000}
        >
          <Alert
            variant="filled"
            open={open}
            onClose={handleClose}
            severity="success"
          >
            Plant added to cart!
          </Alert>
        </Snackbar>
      </>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    addToCart: (orderId, plantId) => dispatch(addToCart(orderId, plantId)),
  };
};

export default connect((state) => state, mapDispatch)(AddToCart);
