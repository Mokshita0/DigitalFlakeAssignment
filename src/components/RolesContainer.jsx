import React, { useEffect, useState } from "react";
import "../home.css";
import { IconButton, colors } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import jobOffer from "../assets/job-offer.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useDisplay } from "../contextAPI/displayEle";
import AddRole from "./AddRole";
import EditRole from "./EditRole";

const RolesContainer = () => {
  const { setCurrentEle } = useDisplay();
  const [roles, setRoles] = useState([]);
  const [searchQry, setSearchQry] = useState("");


  const handleAddrole = (Ele) => {
    setCurrentEle(Ele);
  };
  const getRoles = async () => {
    const response = await fetch("http://localhost:7000/api/role/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = await response.json();
    setRoles([...data]);
  };
  useEffect(() => {
    getRoles();
  }, []);

  const getRole = async (id) => {
    // console.log("id",id)
    const response = await fetch(`http://localhost:7000/api/role/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    // console.log(data)
    return data;
  };
  const getRoleByname = async (name) => {
    // console.log("id",id)
    const response = await fetch(`http://localhost:7000/api/role/search/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    // console.log(data)
    return data;
  };

  const deleteRole = async (id) => {
    // console.log("id",id)
    const response = await fetch(`http://localhost:7000/api/role/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data)
    return data;
  };

  const handleDelete = async (id) => {
    const data = await deleteRole(id);
    if (data.data) {
      alert(data.message);
      getRoles();
      return;
    }
    alert(data.message);
  };

  const handleEdit = async (id) => {
    const data = await getRole(id);
    setCurrentEle(<EditRole key={data.name} data={data} />);
  };

  const handleSearchRoles = async(name) => {
    const resp=await getRoleByname(name);
    setRoles([...resp]);
    setSearchQry("");
  };


  return (
    <div className="displayMain displayRoles">
      <div className="searchRole">
        <img src={jobOffer} alt="home icon" className="sideIcon" />
        <p>Roles</p>
        <div className="sb-search">
          <IconButton onClick={() => handleSearchRoles(searchQry)}>
            <SearchIcon className="icon" />
          </IconButton>
          <input
            className="search-box"
            placeholder="search"
            type="text"
            value={searchQry}
            onChange={(e) => {
              setSearchQry(e.target.value);
            }}
          />
        </div>
        <button onClick={() => handleAddrole(<AddRole />)}>Add New</button>
      </div>
      <div className="rolesTableContainer">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Role Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{role.name}</td>
                  <td
                    style={role.status ? { color: "green" } : { color: "red" }}
                  >
                    {role.status ? "active" : "inActive"}
                  </td>
                  <td className="actionIcon">
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleDelete(role._id)}
                    />
                    <EditNoteOutlinedIcon
                      onClick={() => handleEdit(role._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesContainer;
