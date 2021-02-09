import axios from 'axios';
import { cartObj } from '../components/Cart';

//action creators
const SET_CART = 'SET_CART';

//action creators //
const setCart = (cart) => ({ type: SET_CART, cart });

//thunk creator
export const fetchCart = (orderId) => {
  return async (dispatch) => {
    const cart = cartObj;
    // const cart = (await axios.get(`/api/cart/${orderId}`)).data;
    console.log(cart, 'cart in redux store');
    dispatch(setCart(cart));
  };
};
export const updateCart = (orderId, plantId, quantity) => {
  return async (dispatch) => {
    const cart = (await axios.put(`api/cart/${orderId}`, { plantId, quantity }))
      .data;
    dispatch(setCart(cart));
  };
};

export const createCart = (userId) => {
  return async (dispatch) => {
    const cart = (await axios.post(`/api/cart/`, { userId })).data;
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
