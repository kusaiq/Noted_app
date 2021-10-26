import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	CLEAR_ERRORS,
	LOGOUT
} from '../types';
export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			localStorage.setItem("isAuthenticated", "true");//in browser local storage we gonna set an item called token to
			localStorage.setItem("user", action.payLoad);
			return {
				...state,
				isAuthenticated:localStorage.getItem("isAuthenticated"),
				loading: false,
				user: localStorage.getItem("user")
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", action.payLoad.token);
			localStorage.setItem("isAuthenticated", "true");//in browser local storage we gonna set an item called token to
			return {
				...state,
				isAuthenticated: localStorage.getItem('isAuthenticated', true),
				...action.payLoad.token,
				loading: false,
				error: null
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem("token");
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("user");
			return {
				...state,
				token: localStorage.getItem("token"),
				isAuthenticated: localStorage.getItem("isAuthenticated"),
				error: action.payLoad,
				loading: true,
				user: null,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
};