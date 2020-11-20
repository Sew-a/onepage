import React, {useState, useEffect} from "react";
import axios from "axios";

import Modal from "./modal/Modal"
import useModal from "./modal/UseModal";
import {Link} from "react-router-dom";



 const Api = () => {

    const [all, getAll] = useState([]);

    const [fName, setfName] = useState("");
    const [pass, setPass] = useState("");
    // const [giveId, setGiveId] = useState("");

    const {isShowing, toggle} = useModal();
    const [showDataTarg, setShowDataTarg] = useState("");


    (useEffect(() => {
        allUsers();
    },[] ));



    // ------------------- GET

    const allUsers =  () => {
        axios.get(`http://localhost:3001/users`)
            .then(res => {
                const allPersons = (res.data);
                getAll(allPersons);
                console.log(allPersons);
            })
    }

    // -----------------------SHOW

     const showUser = async (id) => {
         await axios.get(`http://localhost:3001/users/${id}`)
             .then(res => {
                 const tor = res.data;
                 // console.log(tor);
                 setShowDataTarg(tor);
             });
         {toggle()}
     }


    //  --------------------  DELETE

    const deleteUser = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
            .then(res => {
                allUsers();
            })
    }

    // ---------------------------- POST

     const onChangeValue = event => setfName(event.target.value);
     const onChangePass = event => setPass(event.target.value);
     // const onChangeID = event => setGiveId(event.target.value);


    const addUser = async () => {
      await  axios.post(`http://localhost:3001/users/`, {
            name: fName,
            password: pass,
            profession: "Developer",
        });
        setfName("");
        setPass("");
        allUsers();
    }

    // -------------------------------- PUT

    const changeUser = async (id ,e) => {
        await axios.put(`http://localhost:3001/users/${id}`, {
            name: fName.length > 3 ? fName : "Gaga",
            password: pass.length > 3 ? pass : "45454545",
            profession: "Developer",
            id,
       });
        allUsers();
    }



// DOM
return(
        <div className="table-section">
            <input placeholder="Name" value={fName} onChange={onChangeValue} />
            <input placeholder="Password" value={pass} onChange={onChangePass} />
            <button onClick={addUser} >Create User</button>
        <table>
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Pass</td>
                <td>Change</td>
                <td>Delete</td>
            </tr>
            </thead>
            <tbody>
                 {all.map(item => (
                     <tr key={item.id}>
                         <td onClick={() => showUser(item.id)}>{item.id}</td>
                         <td>{item.name}</td>
                         <td>{item.password}</td>
                         <td className="add" onClick={(e) => changeUser(item.id, e)}>Change</td>
                         <td className="delete" onClick={(e) => deleteUser(item.id, e)}>&#10006;</td>
                     </tr>
                 ))}
            </tbody>
        </table>
        {/*    MODAL  */}

            <Modal isShowing={isShowing}  hide={toggle}  useName={showDataTarg} />

        </div>
  );
};


export default Api;




