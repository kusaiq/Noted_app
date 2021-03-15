import React, { Fragment } from 'react';
import Contacts from '../contact/contacts';
import ContactForm from '../contact/contactForm';
import ContactFilter from '../contact/contactFilter';

const Home = () => {
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    );
};
export default Home;