import axios from 'axios';
import history from '../history';

const storage = () => window.localStorage;
const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = storage().getItem(TOKEN);
  if (token) {
    //this response returns the user in our DB associated with the JWT token in localStorage
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    console.log(
      res.data,
      'res.data which will become auth object, which is the user object'
    );
    history.push('/');
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  let res;
  try {
    console.log('authenticate function running');

    res = await axios.post(`/auth/${method}`, { email, password });
    storage().setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  storage().removeItem(TOKEN);
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
