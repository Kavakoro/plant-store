import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store/cart';
import Button from '@material-ui/core/Button';

//this button works just, calls updateCart on cart redux but not hooked up yet.

// const AddToCart = ({ orderId, plantId }) => {
//   console.log(orderId);

//   return <button onClick={addToCart(orderId, plantId)}>Add To Cart</button>;
// };

// const mapDispatch = (dispatch, orderId, plantId) => {
//   return {
//     addToCart: (orderId, plantId, quantity) =>
//       dispatch(addToCart(orderId, plantId, quantity)),
//   };
// };

// export default connect((state) => state, mapDispatch)(AddToCart);

export const cartObj = {
  orderId: 2,
  plants: [
    {
      id: 1,
      name: 'Fern',
      img: 'https://www.loremflickr.com/220/200/houseplant',
      price: 120,
      amount: 1,
    },
    {
      id: 2,
      name: 'Cactus',
      img: 'https://www.loremflickr.com/220/200/houseplant?random=1',
      price: 100,
      amount: 1,
    },
  ],
};

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cart, plantId, addToCart } = this.props;
    const orderId = cart.id;
    return (
      <Button variant="contained" onClick={() => addToCart(orderId, plantId)}>
        Add To Cart
      </Button>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    addToCart: (orderId, plantId) => dispatch(addToCart(orderId, plantId)),
  };
};

export default connect((state) => state, mapDispatch)(AddToCart);
