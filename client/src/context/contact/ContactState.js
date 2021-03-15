import react, { useReducer} from 'react'
import ContactCondext from './contactContext';
import contactReducer from './contactReducer';
import { v4 as uuidv4 } from 'uuid';
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
const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'kusai',
				email: 'kusamoh567@gmail.com',
				phone: '0924026416',
				type: 'personal'

			},
			{
				id: 2,
				name: 'bader',
				email: 'bader567@gmail.com',
				phone: '0924026416',
				type: 'personal'
			},
			{
				id: 3,
				name: 'malek',
				email: 'malek43@gmail.com',
				phone: '094378435',
				type: 'professional'
			}
		],
		current: null,
		filtered:null
	}

	const [state, dispatch] = useReducer(contactReducer, initialState);

	//ADD_CONTACT,
	const addContact = contact => {
		contact.id = uuidv4();
		dispatch({ type: ADD_CONTACT, payLoad: contact})
	}

	//DELETE_CONTACT,
	const deleteContact = id => {
		
		dispatch({ type: DELETE_CONTACT, payLoad: id })
	}
	//SET_CURRENT,
	const setCurrent = contact => {

		dispatch({ type: SET_CURRENT, payLoad: contact })
	}
	//CLEAR_CURRENT,
	const clearCurrent = () => {

		dispatch({ type: CLEAR_CURRENT , payLoad: null })
	}
	//UPDATE_CONTACT,
	const UpdateContact = contact => {

		dispatch({ type: UPDATE_CONTACT, payLoad: contact })
	}
	//FILTER_CONTACTS,
	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACTS, payLoad: text })
	}
	//CLEAR_CONTACTS,

	//CLEAR_FILTER,
	const clearFilter = () => {

		dispatch({ type: CLEAR_FILTER, payLoad: null })
	}
	return (
		<ContactCondext.Provider value={{
			contacts: state.contacts,
			current: state.current,
			filtered: state.filtered,
			addContact,
			deleteContact,
			setCurrent,
			clearCurrent,
			UpdateContact,
			filterContacts,
			clearFilter
		}}>
			{props.children}
		</ContactCondext.Provider>
		)
}
export default ContactState;
