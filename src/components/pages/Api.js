import React, { useState, useEffect } from "react";
import axios from "axios";
import NewModal from "./modal/NewModal";
import { Table } from "./modal/Table";
import { ModForm } from "./modal/ModForm";
import { Pagination } from "./modal/Pagination";

const Api = () => {
  const [all, getAll] = useState([]);

  // pagination dovs
  const [postsPerPage] = useState(10);
  const [allPages, setAllPages] = useState(null);
  //pagin-end

  const [fName, setfName] = useState("");
  const [pass, setPass] = useState("");
  const [userID, setUserID] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  //Modals
  const [isOpen, setIsOpen] = useState(false);
  const [orOpen, setOrOpen] = useState(false);
  // Errors
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");

  //url
  const baseUrl2 = "http://localhost:3001/users/";

  useEffect(() => {
    allUsers();
  }, []);

  // ------------------- GET

  const allUsers = async (pageNumber) => {
    const res = await axios.get(
      `http://localhost:3001/users?page=${pageNumber}&limit=10`
    );
    const allPersons = res.data.users;
    getAll(allPersons);
    // console.log(res.data);
    setAllPages(res.data.count);
  };

  //  --------------------  DELETE

  const deleteUser = async (id) => {
    await axios.delete(`${baseUrl2}${id}`);
    await allUsers();
  };

  // ---------------------------- POST

  const sets = (Open) => {
    setfName("");
    setPass("");
    setUserAvatar("");
    Open(false);
    allUsers();
  };

  const addUser = async () => {
    await axios.post(baseUrl2, {
      name: fName,
      password: pass,
      img_url: userAvatar,
    });
    sets(setOrOpen);
  };

  // -------------------------------- PUT

  const clickChangeUser = async () => {
    await axios.put(`${baseUrl2}${userID}`, {
      name: fName,
      password: pass,
      id: userID,
      img_url: userAvatar,
    });
    sets(setIsOpen);
  };

  const changeUser = (item) => {
    setIsOpen(true);
    setUserID(item.id);
    setUserAvatar(item.img_url);
    setfName(item.name);
    setPass(item.password);
  };

  //Validation
  const validate = (func) => {
    fName.length === 0 ? setNameError("✖") : setNameError("");
    pass.length === 0 ? setPassError("✖") : setPassError("");
    if (fName.length >= 1 && pass.length >= 1) {
      func();
    }
  };

  // Handlers

  const handleSubmit = (event) => {
    event.preventDefault();
    validate(addUser);
    allUsers();
  };
  const clickChangeSubmit = (event) => {
    event.preventDefault();
    validate(clickChangeUser);
    allUsers();
  };

  const onChangeName = (e) => {
    setfName(e.target.value);
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
  };
  const onChangeAvatar = (e) => {
    setUserAvatar(e.target.value);
  };

  // when we close modal
  const modalClosed = () => {
    setIsOpen(false);
    setUserID("");
    setfName("");
    setPass("");
    setUserAvatar("");
  };

  // DOM
  return (
    <div className="table-section">
      {/*--------------- Table -----------------------*/}
      {all.length ? (
        <>
          <Table all={all} changeUser={changeUser} deleteUser={deleteUser} />
          <button onClick={() => setOrOpen(true)} className="add_btn">
            ADD
          </button>
        </>
      ) : (
        <h3 className="errorMessage">There are no users</h3>
      )}
      {/* --------------------------Pagination -------------------------------*/}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={allPages}
        allUsers={allUsers}
      />

      {/* -------------------------- MODAL =----------------------- @*/}
      <NewModal open={isOpen} onClose={modalClosed}>
        <ModForm
          fName={fName}
          onChangeName={onChangeName}
          pass={pass}
          onChangePass={onChangePass}
          nameError={nameError}
          passError={passError}
          userAvatar={userAvatar}
          onChangeAvatar={onChangeAvatar}
          submit={clickChangeSubmit}
          userID={userID}
        />
      </NewModal>

      <NewModal open={orOpen} onClose={() => setOrOpen(false)}>
        <ModForm
          fName={fName}
          onChangeName={onChangeName}
          pass={pass}
          onChangePass={onChangePass}
          nameError={nameError}
          passError={passError}
          userAvatar={userAvatar}
          onChangeAvatar={onChangeAvatar}
          submit={handleSubmit}
          userID={userID}
        />
      </NewModal>
    </div>
  );
};

export default Api;
