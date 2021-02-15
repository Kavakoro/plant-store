import axios from "axios";

//constants
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

//action creators
const _setUser = (user) => ({ type: SET_USER, user });

const _updateUser = (user) => ({ type: UPDATE_USER, user });

//thunk middleware functions
export const setUser = (id) => {
  return async (dispatch) => {
    const user = (await axios.get(`/api/users/${id}`)).data;
    dispatch(_setUser(user));
  };
};

export const updateUser = (id, email, history) => {
  console.log("from thunk", id, email);
  return async (dispatch) => {
    const user = (
      await axios.put(`/api/users/${id}`, {
        email,
      })
    ).data;
    dispatch(_updateUser(user));
    history.push(`/admin/Users`);
  };
};

export function singleUserReducer(state = {}, action) {
  if (action.type === SET_USER) {
    return action.user;
  }
  if (action.type === UPDATE_USER) {
    return action.user;
  }

  return state;
}
