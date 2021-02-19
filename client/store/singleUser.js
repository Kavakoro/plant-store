import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');
//constants
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_PROFILE = 'UPDATE_PROFILE';

const _setUser = (user) => ({ type: SET_USER, user });
const _updateProfile = (user) => ({ type: UPDATE_PROFILE, user });
const _updateUser = (user) => ({ type: UPDATE_USER, user });

// thunk middleware functions

export const setUser = (id) => {
  return async (dispatch) => {
    const user = (await axios.get(`/api/users/${id}`)).data;
    dispatch(_setUser(user));
  };
};

// function for a USER to update their own profile
export const updateProfile = (
  id,
  firstName,
  lastName,
  phoneNumber,
  birthdate,
  email,
  history
) => {
  return async (dispatch) => {
    const token = getToken();
    const user = (
      await axios.put(
        `/api/users/${id}`,
        {
          firstName,
          lastName,
          phoneNumber,
          birthdate,
          email,
        },
        {
          headers: { authorization: token },
        }
      )
    ).data;
    dispatch(_updateProfile(user));
    history.push(`/`);
  };
};

//this is the function for an ADMIN to update a user in the system
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
  return async (dispatch) => {
    const token = getToken();
    const user = (
      await axios.put(
        `/admin/users/${id}`,
        {
          firstName,
          lastName,
          phoneNumber,
          birthdate,
          email,
          isAdmin,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
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
