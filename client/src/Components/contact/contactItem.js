import React, { useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact}) => {
    const { name, _id, email, phone, type } = contact

        const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }
    const onEdit = () => {
        setCurrent(contact);
    }
    return (

        <div className="card bg-light">
            <h3 className="text-left">
                {name}{' '}<span style={{float:"right"}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type}
                </span>
            </h3>
            <ul >
                <li>
                    <i className="fas fa-envelope-square"></i>
                    {" " + email}
                </li>
                <li>
                    <i className="fas fa-phone-square"></i>
                    {" " + phone}
                    </li>
            </ul>
            <button className="btn btn-primary btn-sm " onClick={onEdit} >Edit</button>
            <button className="btn btn-sm btn-danger" onClick={onDelete}>Delete</button>
        </div>
    )
}
export default ContactItem;