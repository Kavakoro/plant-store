import axios from "axios";
import history from "../history";

const storage = () => window.localStorage;
const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = (method) => async (dispatch) => {
	const token = storage().getItem(TOKEN);
	if (token) {
		//this response returns the user in our DB associated with the JWT token in localStorage
		const res = await axios.get("/auth/me", {
			headers: {
				authorization: token,
			},
		});
		if (method) {
			history.push("/");
		}
		// console.log(history, "history");
		// history.push("/");
		return dispatch(setAuth(res.data));
	}
};

export const authenticate = (email, password, method) => async (dispatch) => {
	let res;
	try {
		res = await axios.post(`/auth/${method}`, { email, password });
		storage().setItem(TOKEN, res.data.token);
		dispatch(me(method));
	} catch (authError) {
		return dispatch(setAuth({ error: authError }));
	}
};

export const logout = () => {
	// storage().removeItem(TOKEN);
	storage().clear();
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
