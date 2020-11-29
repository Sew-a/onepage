import React from 'react';
import ReactDOM from "react-dom";


const NewModal = ({children, open, onClose}) => {
    if(!open) return null;

    return ReactDOM.createPortal(
        <>
        <div className='modal'>
            <div onClick={onClose} className="modal-close-button ">&#10006;</div>
            {children}
        </div>
        </>,
        document.getElementById("portal")
    );
}

export default NewModal;