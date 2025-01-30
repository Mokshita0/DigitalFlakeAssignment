import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import "../home.css";
import { TextField } from "@mui/material";
import { useDisplay } from "../contextAPI/displayEle";
import RolesContainer from "./RolesContainer";
const EditRole = ({data}) => {
  const { setCurrentEle}=useDisplay();
  const [rolename,setRolename]=useState(data.name);
  const [status,setStatus]=useState(data.status);
  const id=data._id;
  // console.log(status,rolename);
  

  const updateRole=async(id)=>{
    // console.log("id",id)
    const response=await fetch(`http://localhost:7000/api/role/${id}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name: rolename,
        status: status,
      }),
    });
    const data=await response.json();
    console.log(data);
    return data;
  };
  const handleSave=async ()=>{
    const data=await updateRole(id);
    if(data.data){
      alert(data.message);
      setCurrentEle(<RolesContainer/>)
      return;
    }
    alert(data.message);
  };
  const handleCancel=()=>{
    setCurrentEle(<RolesContainer/>)
  }
  return (
    <div className="displayMain displayAddRole">
      <div className="ar-titleContainer">
        <ArrowBackOutlinedIcon style={{ color: "#9d9d9d" }} />
        <p>Edit Role</p>
      </div>
      <div className="ar-inputesContainer">
        <TextField
          required
          id="outlined-required"
          defaultValue=" "
          label="Role Name"
          type="text"
          className="ar-input"
          value={rolename}
          onChange={(e)=>{setRolename(e.target.value)}}
        />
        
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

export default EditRole;
