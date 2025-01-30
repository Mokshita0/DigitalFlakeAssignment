import React, { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import "../home.css";
import { Alert, Select, TextField } from "@mui/material";
import { useDisplay } from "../contextAPI/displayEle";
import UsersContainer from "./UsersContainer";
const AddUser = () => {
  const { setCurrentEle } = useDisplay();
  const [roles, setRoles]=useState([]);
  const [name, setName]=useState("");
  const [mobile, setMobile]=useState("");
  const [email, setEmail]=useState("");
  const [roleId, setRoleId]=useState("");
  console.log("roleID>>>>>>>>",roleId);

  const getRoles = async () => {
    const response = await fetch("http://localhost:7000/api/role/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = await response.json();
    setRoles([...data]);
    // console.log(data)
  };
  


  useEffect(()=>{getRoles()},[]);

  const handleSave = async () => {
    const response = await fetch(`http://localhost:7000/api/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        roleId,
      }),
    });
    const json = await response.json();
    if(json.data){
      <Alert severity="success">User added successfully.</Alert>
      setCurrentEle(<UsersContainer/>)
    }
    <Alert severity="error">{json.message}</Alert>
  };

  const handleCancel = () => {
    setCurrentEle(<UsersContainer />);
  };

  return (
    <div className="displayMain displayAddRole">
      <div className="ar-titleContainer">
        <ArrowBackOutlinedIcon style={{ color: "#9d9d9d" }} />
        <p>Add User</p>
      </div>
      <div className="ar-inputesContainer">
        <TextField
          required
          id="outlined-required"
          defaultValue=" "
          label="Name"
          type="text"
          className="ar-input"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        <TextField
          required
          id="outlined-required"
          defaultValue=" "
          label="Mobile"
          type="number"
          className="ar-input"
          value={mobile}
          onChange={(e)=>{setMobile(e.target.value)}}
        />
        <TextField
          required
          id="outlined-required"
          defaultValue=" "
          label="Email"
          type="email"
          className="ar-input"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
       <select value={roleId} onClick={(e)=>{setRoleId(e.target.value)}}>
          {roles.map((role,index)=>{
            const id=role._id;
            return(
              <option key={index} value={id}>{role.name}</option>
            )
          })}
        </select>
      
      </div>
      <div className="ar-buttons">
        <button className="round_btn" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="round_btn"
          style={{ backgroundColor: "#662671", color: "white" }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddUser;
