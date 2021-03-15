import React, { useContext, useRef, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const contactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const { filterContacts, clearFilter, filtered } = contactContext;

   

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });//reason behind this code if we used filtered then we clear filteres we wanna clear the current as well

    const onChange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value)
        } else {
            clearFilter();
        }
    }
    return (

        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Contacts...'
                onChange={onChange}
            />
        </form>
    )
}
export default contactFilter;