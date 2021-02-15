import axios from 'axios';

//constants
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';

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

// for now, this is the function for an ADMIN to update a user; we will need one for when a user updates his/her account info
// also - we can pass in a variable that tells us api vs admin path and we can make the axios call depending on that
// for example the call will be either /api//users/id or /admin/users/id
export const updateUser = (id, email, history) => {
  //console.log('from thunk', id, email);
  return async (dispatch) => {
    const user = (
      await axios.put(`/admin/users/${id}`, {
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
