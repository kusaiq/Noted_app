import React, { useReducer} from 'react'
import ContactCondext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
//import { v4 as uuidv4 } from 'uuid';
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
const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
		loading: true
	}

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// GET CONTACT
	const GetContact = async () => {
		try {
			const res = await axios.get('http://localhost:5000/api/v1/contacts');

			dispatch({
				type: GET_CONTACTS,
				payLoad: res.data.data
			})
		} catch (err) {
			//console.log(err.response.data.error)
			dispatch({
				type: CONTACT_ERRORS,
				payLoad: err.response.data.error //to understand this just console.log one object at the time ok

			})
		}
	}

	//ADD_CONTACT,
	const addContact = async contact => {
		//contact.id = uuidv4();
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.post('http://localhost:5000/api/v1/contacts', contact, config);
			dispatch({
				type: ADD_CONTACT, 
				payLoad: res.data.data
			})
			}
		 catch (err) {
			//console.log(err.response.data.error)
			dispatch({
				type: CONTACT_ERRORS,
				payLoad: err.response.data.error //to understand this just console.log one object at the time ok

			})
		}
		
	}
	//DELETE_CONTACT,
	const deleteContact = async id => {
		//contact.id = uuidv4();
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.delete(`http://localhost:5000/api/v1/contacts/${id}`);
			dispatch({
				type: DELETE_CONTACT,
				payLoad: id
			})
		}
		catch (err) {
			console.log(err.response)
			dispatch({
				type: CONTACT_ERRORS,
				payLoad: err.response //to understand this just console.log one object at the time ok

			})
			console.log(err.response.data.error)
		}

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
	const UpdateContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			const res = await axios.put(`http://localhost:5000/api/v1/contacts/${contact._id}`, contact, config);
			dispatch({
				type: UPDATE_CONTACT,
				payLoad: res.data.data
			})
		}
		catch (err) {
			//console.log(err.response.data.error)
			dispatch({
				type: CONTACT_ERRORS,
				payLoad: err.response.data.error //to understand this just console.log one object at the time ok

			})
		}

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
			loading: state.loading,
			error: state.error,
			addContact,
			deleteContact,
			setCurrent,
			clearCurrent,
			UpdateContact,
			filterContacts,
			clearFilter,
			GetContact
		}}>
			{props.children}
		</ContactCondext.Provider>
		)
}
export default ContactState;
