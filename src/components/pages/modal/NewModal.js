import React from 'react';
import ReactDOM from "react-dom";


const NewModal = ({open, children, onClose}) => {
    if(!open) return null;

    return ReactDOM.createPortal(
        <>
        <div className='modal_styles'>
            <i onClick={onClose} className="close_btn">&#10006;</i>
            <div className="mmm">{children}</div>
        </div>
        </>,
        document.getElementById("portal")
    );
}

export default NewModal;