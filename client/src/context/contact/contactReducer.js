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

} from '../types';
export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.payLoad]//we cant just change contacts state i imutable so we have to copy whats in the state 
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts : state.contacts.filter(contact => contact.id !== action.payLoad)
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
				contacts: state.contacts.map(contact => contact.id == action.payLoad.id ?
					action.payLoad : contact)
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
		default:
			return state;
	}
};