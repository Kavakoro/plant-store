import axios from 'axios';

//constants
const SET_ORDER = 'SET_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

//action creators
const _setOrder = (order) => ({ type: SET_ORDER, order });

const _updateOrder = (order) => ({ type: UPDATE_ORDER, order });

//thunk middleware functions
export const setOrder = (id) => {
  return async (dispatch) => {
    const order = (await axios.get(`/api/orders/${id}`)).data;
    dispatch(_setOrder(order));
    // console.log(order);
  };
};

//this function is for admin to update an order in the database
export const updateOrder = (
  id,
  shipTo,
  streetAddress,
  state,
  city,
  zipCode,
  fullfilled,
  total,
  history
) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const order = (
      await axios.put(`/api/orders/${id}`, {
        shipTo,
        streetAddress,
        state,
        city,
        zipCode,
        fullfilled,
        total,
        headers: { authorization: token },
      })
    ).data;
    dispatch(_updateOrder(order));
    history.push(`/admin/Orders`);
  };
};

export function singleOrderReducer(state = {}, action) {
  if (action.type === SET_ORDER) {
    return action.order;
  }
  if (action.type === UPDATE_ORDER) {
    return action.order;
  }

  return state;
}
