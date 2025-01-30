import React, { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import "../home.css";
import { TextField } from "@mui/material";
import { useDisplay } from "../contextAPI/displayEle";
import UsersContainer from "./UsersContainer";
const EditUser = ({userdata}) => {
  const {setCurrentEle}=useDisplay();
  const [roles, setRoles]=useState([]);
  const [name, setName]=useState(userdata.name);
  const [mobile, setMobile]=useState(userdata.mobile);
  const [email, setEmail]=useState(userdata.email);
  const [roleId, setRoleId]=useState(userdata._id);
  const [status, setStatus]=useState(false);
  const id=userdata._id;
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

  const updateUser=async(id)=>{
    // console.log("id",id)
    const response=await fetch(`http://localhost:7000/api/user/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name,
        email,
        mobile,
        roleId,
        status
      }),
    });
    const data=await response.json();
    // console.log(data);
    return data;
  };

  const handleSave=async ()=>{
    const data=await updateUser(id);
    if(data.data){
      alert(data.message);
      setCurrentEle(<UsersContainer/>)
      return;
    }
    alert(data.message);
  };

  useEffect(()=>{getRoles()},[]);

  const handleCancel=()=>{
    setCurrentEle(<UsersContainer/>)
  }
  return (
    <div className="displayMain displayAddRole">
      <div className="ar-titleContainer">
        <ArrowBackOutlinedIcon style={{ color: "#9d9d9d" }} />
        <p>Edit User</p>
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
        <select value={roleId} onChange={(e)=>{setRoleId(e.target.value)}}>
          {roles.map((role,index)=>{
            return(
              <option key={index} value={role._id}>{role.name}</option>
            )
          })}
        </select>
        
        <select value={status} onChange={(e)=>{setStatus(e.target.value)}}>
          <option value={true}>active</option>
          <option value={false}>inActive</option>
        </select>
      </div>
      <div className="ar-buttons">
        <button className="round_btn" onClick={handleCancel}>Cancel</button>
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

export default EditUser;
