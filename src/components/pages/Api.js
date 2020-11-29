import React, {useState, useEffect} from "react";
import axios from "axios";
import NewModal from "./modal/NewModal";
import {Button} from "./modal/Button";
import {Table} from "./modal/Table";
import {ModForm} from "./modal/ModForm";

 const Api = () => {
    const [all, getAll] = useState([]);

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

    (useEffect(() => {
        allUsers();
    },[] ));


    // ------------------- GET

    const allUsers = async () => {
        const res = await axios.get(`http://localhost:3001/users`);

        const allPersons = (res.data);
        getAll(allPersons);
        console.log(allPersons);
    }

    //  --------------------  DELETE

    const deleteUser = async (id) => {
        const res = await axios.delete(`http://localhost:3001/users/${id}`);
        await allUsers();
    }

    // ---------------------------- POST

     const sets = (Open) => {
         setfName("");
         setPass("");
         setUserAvatar("");
         Open(false);
         allUsers();
     }


    const addUser = async () => {
      await  axios.post(`http://localhost:3001/users/`, {
            name: fName,
            password: pass,
            img_url: userAvatar,
        });
        sets(setOrOpen);
    }

    // -------------------------------- PUT

     const clickChangeUser = async () => {
         await axios.put(`http://localhost:3001/users/${userID}`, {
             name: fName,
             password: pass,
             id: userID,
             img_url:userAvatar,
         });
         sets(setIsOpen);
     }

    const changeUser = (item) => {
        setIsOpen(true);
        setUserID(item.id);
        setUserAvatar(item.img_url);
        setfName(item.name);
        setPass(item.password);
    }

    //Validation
    const validate = (func) => {
        fName.length === 0 ? setNameError("✖") : setNameError("");
        pass.length === 0 ? setPassError("✖") : setPassError("");
        if(fName.length >= 1 && pass.length >= 1) { func(); }
    }

    // Handlers

    const handleSubmit = (event) => {
       event.preventDefault();
       validate(addUser);
       allUsers();
    }
    const clickChangeSubmit = (event) => {
       event.preventDefault();
       validate(clickChangeUser);
       allUsers();
    }

    const onChangeName = (e) => { setfName(e.target.value) }
    const onChangePass = (e) => { setPass(e.target.value) }
    const onChangeAvatar = (e) => { setUserAvatar(e.target.value) }

    // when we close modal
    const modalClosed = () => {
        setIsOpen(false);
        setfName("");
        setPass("");
        setUserAvatar("");
    }


// DOM
return(
        <div className="table-section">
            {/*--------------- Table -----------------------*/}
            { (all.length) ?
                <>
                    <Table all={all} changeUser={changeUser} deleteUser={deleteUser} />,
                    <button onClick={()=> {setOrOpen(true)}} className="add_btn">ADD</button>
                </>
                : <h3 className="errorMessage">Something went wrong, please try a little later</h3> }

            {/* -------------------------- MODAL =----------------------- @*/}
            <NewModal open={isOpen} onClose={modalClosed}>
                <div className="image"><img src={userAvatar} /></div>
                <div className="in-p">
                      <label htmlFor="id">ID</label>
                      <input name="id" placeholder={userID} disabled="disabled" />
                </div>
                <ModForm fName={fName} onChangeName={onChangeName} pass={pass} onChangePass={onChangePass}
                         nameError={nameError} passError={passError} userAvatar={userAvatar} onChangeAvatar={onChangeAvatar} />
               <Button submit={clickChangeSubmit} />
            </NewModal>

            <NewModal open={orOpen} onClose={() => setOrOpen(false)}>
                    <ModForm fName={fName} onChangeName={onChangeName} pass={pass} onChangePass={onChangePass}
                         nameError={nameError} passError={passError} userAvatar={userAvatar} onChangeAvatar={onChangeAvatar} />
                    <Button submit={handleSubmit} />
            </NewModal>

        </div>
  );
};


export default Api;




