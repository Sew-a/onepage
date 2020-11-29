import React from "react";

export const ModForm = (props) => {
    return (
        <div>
            <div className="in-p">
                <input placeholder="Name" value={props.fName} onChange={(e) => props.onChangeName(e)} />
                <div className="error">{props.nameError}</div>
            </div>
            <div className="in-p">
                <input placeholder="Password" value={props.pass} onChange={e => props.onChangePass(e)} />
                <div className="error">{props.passError}</div>
            </div>
        </div>

    )
}