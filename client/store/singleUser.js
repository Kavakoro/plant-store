import axios from "axios";

//constants
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const UPDATE_PROFILE = "UPDATE_PROFILE";

const _setUser = (user) => ({ type: SET_USER, user });
const _updateProfile = (user) => ({ type: UPDATE_PROFILE, user });

// thunk middleware functions

export const setUser = (id) => {
  console.log(id);
  return async (dispatch) => {
    const user = (await axios.get(`/api/users/${id}`)).data;
    dispatch(_setUser(user));
  };
};

export const updateProfile = (
  id,
  firstName,
  lastName,
  phoneNumber,
  birthdate,
  email,
  history
) => {
  // console.log("this is profileUpdate", id);
  return async (dispatch) => {
    const user = (
      await axios.put(`/api/users/${id}`, {
        firstName,
        lastName,
        phoneNumber,
        birthdate,
        email,
      })
    ).data;
    dispatch(_updateProfile(user));
    history.push(`/`);
  };
};

// for now, this is the function for an ADMIN to update a user; we will need one for when a user updates his/her account info
// also - we can pass in a variable that tells us api vs admin path and we can make the axios call depending on that
// for example the call will be either /api//users/id or /admin/users/id
export const updateUser = (
  id,
  firstName,
  lastName,
  phoneNumber,
  birthdate,
  email,
  isAdmin,
  history
) => {
  //console.log('from thunk', id, email);
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const user = (
      await axios.put(`/api/users/${id}`, {
        firstName,
        lastName,
        phoneNumber,
        birthdate,
        email,
        isAdmin,
        headers: {
          authorization: token,
        },
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
  if (action.type === UPDATE_PROFILE) {
    return action.user;
  }

  return state;
}
