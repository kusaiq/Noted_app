import React, { Fragment ,  useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext
    return (
        <Fragment>
            <TransitionGroup>
            {
                alerts.length > 0 && alerts.map(k => (
                    <CSSTransition key={k.id} timeout={500} classNames="item">
                    <div key={k.id} className={`alert alert-${k.type}`}>
                        <i className='fas fa-info-circle' /> {k.msg}
                    </div>

                    </CSSTransition>



                ))
            }
            </TransitionGroup>

        </Fragment>
    );
};
export default Alerts;