import axios from "axios";

//constants
const SET_ORDER = "SET_ORDER";
// const UPDATE_USER = "UPDATE_USER";

//action creators
const _setOrder = (order) => ({ type: SET_ORDER, order });

// const _updateUser = (user) => ({ type: UPDATE_USER, user });

//thunk middleware functions
export const setOrder = (id) => {
  return async (dispatch) => {
    const order = (await axios.get(`/api/orders/${id}`)).data;
    console.log(order);
    dispatch(_setOrder(order));
  };
};

// export const updateUser = (id, email, history) => {
//   console.log("from thunk", id, email);
//   return async (dispatch) => {
//     const user = (
//       await axios.put(`/api/users/${id}`, {
//         email,
//       })
//     ).data;
//     dispatch(_updateUser(user));
//     history.push(`/admin/Users`);
//   };
// };

export function singleUserReducer(state = {}, action) {
  if (action.type === SET_ORDER) {
    return action.order;
  }
  // if (action.type === UPDATE_USER) {
  //   return action.user;
  // }

  return state;
}
