import axios from "axios";
import { cartObj } from "../components/Cart";

//action creators

const SET_CART = 'SET_CART';
const DELETE_ITEM = 'DELETE_ITEM';


//action creators //
const setCart = (cart) => ({ type: SET_CART, cart });
const deletePlant = (plantId) => ({ type: DELETE_ITEM }, plantId);
//thunk creator
export const fetchCart = (orderId) => {
  return async (dispatch) => {
    const cart = cartObj;
    // const cart = (await axios.get(`/api/cart/${orderId}`)).data;
    console.log(cart, "cart in redux store");
    dispatch(setCart(cart));
  };
};
export const updateCart = (orderId, plantId, quantity) => {
  return async (dispatch) => {
    const cart = (await axios.put(`api/cart/${orderId}`, { plantId, quantity }))
      .data;

    // i still need to hook this up
    console.log("Add To Cart");
    // dispatch(setCart(cart));
  };
};

export const createCart = (userId) => {
  return async (dispatch) => {
    const cart = (await axios.post(`/api/cart/`, { userId })).data;
    dispatch(setCart(cart));
  };
};
export const deleteItem = (orderId, plantId) => {
  return async (dispatch) => {
    await axios.delete(`/api/cart/${orderId}/${plantId}`);
    dispatch(deletePlant(plantId));
  };
};

//cart reducer
export function cartReducer(state = {}, action) {
  if (action.type === SET_CART) {
    return action.cart;
  }
  if (action.type === DELETE_ITEM) {
    const { plants } = state.plants;
    return {
      ...state,
      plants: plants.filter((plant) => plant.id !== action.plantId),
    };
  }

  return state;
}
