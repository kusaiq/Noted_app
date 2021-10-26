import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERRORS

} from '../types';
export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts:  action.payLoad,//we cant just change contacts state i imutable so we have to copy whats in the state 
				loading: false
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payLoad],//we cant just change contacts state i imutable so we have to copy whats in the state 
				//another note about the above code if we want whenever we add a conatact to be added in the beginning (top )
				//simply swith [...action.payLoad, state.contacts]
				loading: false
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(contact => contact._id !== action.payLoad),
				loading: false
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payLoad
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: action.payLoad
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(contact =>
					contact._id === action.payLoad._id ?
					action.payLoad : contact),
				loading: false
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(contact => {
					const regex = new RegExp(`${action.payLoad}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case CONTACT_ERRORS:
			return {
				...state,
				error: action.payLoad
			};
		default:
			return state;
	}
};