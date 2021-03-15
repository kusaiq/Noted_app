import {
	REGISTER_SUCCESS,
	REGISTER_FAIL

} from '../types';
export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem("token", action.payLoad.token);//in browser local storage we gonna set an item called token to
			return {
				...state,
				...action.payLoad.token,
				isAuthenticated: true,
				loading: false
				
			};
		case REGISTER_FAIL:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				error:action.payLoad
				
			}

		default:
			return state;
	}
};