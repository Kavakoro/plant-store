import axios from 'axios';
import { cartObj } from '../components/Cart';
//action creators
const SET_CART = 'SET_CART';

//action creators //
const setCart = (cart) => ({ type: SET_CART, cart });

//thunk creator
export const fetchCart = (userId) => {
  return async (dispatch) => {
    //make axios call here to /api/cart ??
    //get cart object returned --all logic done in api
    const cart = cartObj;
    console.log(cart, 'cart in redux store');
    dispatch(setCart(cart));
  };
};

//cart reducer
export function cartReducer(state = {}, action) {
  if (action.type === SET_CART) {
    return action.cart;
  }
  return state;
}
