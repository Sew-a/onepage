import React from 'react';
import ReactDOM from 'react-dom';

const allValues = (tor) => {
    let str = '';
    for (let p in tor) {
        if (tor.hasOwnProperty(p)) {
            str += p + ' - ' + tor[p] + '\n';
        }
    }
    return str;
}

const Modal = ({ isShowing, hide, useName }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div>{allValues(useName)}</div>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;