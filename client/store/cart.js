import axios from "axios";

//action creators

const SET_CART = "SET_CART";
const DELETE_ITEM = "DELETE_ITEM";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_CART = "UPDATE_CART";

//action creators //
const setCart = (cart) => ({ type: SET_CART, cart });
const deletePlant = (plantId) => ({ type: DELETE_ITEM, plantId });
const _addToCart = (plants) => ({ type: ADD_TO_CART, plants });
const _updateCart = (cart) => ({ type: UPDATE_CART, cart });

//thunk creators//
export const fetchCart = (orderId) => {
  return async (dispatch) => {
    const cart = (await axios.get(`/api/cart/${orderId}`)).data;
    dispatch(setCart(cart));
  };
};
export const updateCart = (orderId, plantId, amount) => {
  console.log(orderId, "orderId in put request in store");
  console.log(plantId, "plantId for put request in store");
  return async (dispatch) => {
    const cart = (await axios.put(`api/cart/${orderId}`, { plantId, amount }))
      .data;
    console.log(cart, "cart in redux store returned from api");
    dispatch(_updateCart(cart));
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
    await axios.delete(`/api/cart/${orderId}`, { data: { plantId } });
    dispatch(deletePlant(plantId));
  };
};

export const addToCart = (orderId, plantId) => {
  return async (dispatch) => {
    const plants = (await axios.post(`/api/cart/${orderId}`, { plantId })).data;
    dispatch(_addToCart(plants));
  };
};

export const checkout = (orderId, address) => {
  return async (dispatch) => {
    await axios.put(`/api/cart/${orderId}/checkout`, { address: address });
    dispatch(setCart({}));
  };
};

//cart reducer
export function cartReducer(state = { id: "", plants: [] }, action) {
  if (action.type === SET_CART) {
    return action.cart;
  }
  if (action.type === DELETE_ITEM) {
    const { plants } = state;
    return {
      ...state,
      plants: plants.filter((plant) => plant.id !== action.plantId),
    };
  }
  if (action.type === UPDATE_CART) {
    return action.cart;
  }
  if (action.type === ADD_TO_CART) {
    return { ...state, plants: action.plants };
  }
  return state;
}
