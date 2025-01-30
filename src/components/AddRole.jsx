import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import "../home.css";
import { Alert, TextField } from "@mui/material";
import { useDisplay } from "../contextAPI/displayEle";
import RolesContainer from "./RolesContainer";

const AddRole = () => {
  const [role, setRole] = useState("");
  const { setCurrentEle } = useDisplay();

  const handleSave = async () => {
    const response = await fetch(`http://localhost:7000/api/role/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: role,
      }),
    });
    const json = await response.json();
    if(json.data){
      <Alert severity="success">Role added successfully.</Alert>
      setCurrentEle(<RolesContainer/>)
    }
    <Alert severity="error">{json.message}</Alert>
  };
  const handleCancel = () => {
    setCurrentEle(<RolesContainer />);
  };
  return (
    <div className="displayMain displayAddRole">
      <div className="ar-titleContainer">
        <ArrowBackOutlinedIcon style={{ color: "#9d9d9d" }} />
        <p>Add Role</p>
      </div>
      <div className="ar-inputesContainer">
        <TextField
          required
          id="outlined-required"
          defaultValue=" "
          label="Role Name"
          type="text"
          className="ar-input"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
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

export default AddRole;
