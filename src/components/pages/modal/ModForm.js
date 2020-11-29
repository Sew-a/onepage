import React from "react";

const style= {
    width:"100%",
}

export const ModForm = (props) => {
    return (
        <div style={style}>
            <div className="in-p">
                <label htmlFor="image">ImageURL</label>
                <input id="image" placeholder="Image Url" value={props.userAvatar} onChange={props.onChangeAvatar} />
            </div>
            <div className="in-p">
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Name" value={props.fName} onChange={props.onChangeName} />
                <div className="error">{props.nameError}</div>
            </div>
            <div className="in-p">
                <label htmlFor="pass">Password</label>
                <input id="pass" placeholder="Password" value={props.pass} onChange={props.onChangePass} />
                <div className="error">{props.passError}</div>
            </div>
        </div>

    )
}