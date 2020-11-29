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

    const allUsers =  () => {
        axios.get(`http://localhost:3001/users`)
            .then(res => {
                const allPersons = (res.data);
                getAll(allPersons)
                console.log(allPersons);
            })
    }

    //  --------------------  DELETE

    const deleteUser = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
            .then(res => {
                allUsers();
            });
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
        setfName("");
        setPass("");
        setUserAvatar("");
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


// DOM
return(
        <div className="table-section">
            {/*--------------- Table -----------------------*/}
            <Table all={all} changeUser={changeUser} deleteUser={deleteUser} />
            <button onClick={()=> {setOrOpen(true)}} className="add_btn">ADD</button>

            {/* -------------------------- MODAL =----------------------- @*/}
            <NewModal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="image"><img src={userAvatar} /></div>
                <input placeholder={userID} disabled="disabled" />
                <input placeholder="Image Url" value={userAvatar} onChange={(e) => setUserAvatar(e.target.value)} />
                <ModForm fName={fName} onChangeName={onChangeName} pass={pass} onChangePass={onChangePass}
                         nameError={nameError} passError={passError} />
               <Button submit={clickChangeSubmit} />
            </NewModal>

            <NewModal open={orOpen} onClose={() => setOrOpen(false)}>
                    <input placeholder="Image Url" value={userAvatar} onChange={(e) => setUserAvatar(e.target.value)} />
                    <ModForm fName={fName} onChangeName={onChangeName} pass={pass} onChangePass={onChangePass}
                        nameError={nameError} passError={passError} />
                    <Button submit={handleSubmit} />
            </NewModal>

        </div>
  );
};


export default Api;




