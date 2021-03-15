import React, { useState, useContext,useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const { addContact, current, UpdateContact, clearCurrent } = contactContext

    const [contact, setContact] = useState({  
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })  

    const { name, email, phone, type } = contact;

    useEffect(() => {
        if (current != null) {
            setContact(current)
            
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [ContactContext, current]);//only use this when current or ContactContext is changed

    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value  }) 

    const clearAll = () => {
        clearCurrent()
    }
    
    const onSubmit = (event) => {
        if (current) {
            UpdateContact(contact)
            clearCurrent()
        } else {
            addContact(contact)
        }
            event.preventDefault();
            
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }

    return (

        <form className="form-container" onSubmit={onSubmit}>
                <h2 className="text-primary">
                { current?"Update Contact":"Add contact"}
                </h2>
            <input
                type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type </h5>
            <input
                type="radio"
                name="type"
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
            />
            Personal{'  '}
            <input
                type="radio"
                name="type"
                value='professional'
                checked={type === 'professional'}
                onChange={onChange}
            />
            professional{' '}
            <div>
                
                <input className="btn btn-primary btn-block " type="submit"
                    value={current ? "Update Contact" : "Add contact"} />
                
            </div>
            {current && <div>
                <button className="btn btn-block bg-light " onClick={clearAll} >clear all</button>
            </div>}
            
            </form>
        
    )
}


export default ContactForm;

