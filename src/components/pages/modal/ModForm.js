import React from "react";
import NewModal from "./NewModal";

export const ModForm = (props) => {
  return (
    <div className="inner_modal">
      <div className="image">
        <img src={props.userAvatar} />
      </div>
      <div className="in-p">
        <label htmlFor="id">ID</label>
        <input name="id" placeholder={props.userID} disabled="disabled" />
      </div>
      <div className="in-p">
        <label htmlFor="image">ImageURL</label>
        <input
          id="image"
          placeholder="Image Url"
          value={props.userAvatar}
          onChange={props.onChangeAvatar}
        />
      </div>
      <div className="in-p">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Name"
          value={props.fName}
          onChange={props.onChangeName}
        />
        <div className="error">{props.nameError}</div>
      </div>
      <div className="in-p">
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          placeholder="Password"
          value={props.pass}
          onChange={props.onChangePass}
        />
        <div className="error">{props.passError}</div>
        <button className="mod-buttons" onClick={props.submit}>
          Save
        </button>
      </div>
    </div>
  );
};
