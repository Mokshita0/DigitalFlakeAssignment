import React, { useEffect, useState } from "react";
import "../home.css";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import userIcon from "../assets/userIcon.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useDisplay } from "../contextAPI/displayEle";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const UsersContainer = () => {
  const { setCurrentEle } = useDisplay();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const getUsers = async () => {
    const response = await fetch("http://localhost:7000/api/user/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = await response.json();
    setUsers([...data]);
  };
  const getUser = async (id) => {
    // console.log("id",id)
    const response = await fetch(`http://localhost:7000/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    return data;
  };
  const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:7000/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddrole = (Ele) => {
    setCurrentEle(Ele);
  };

  const handleDelete = async (id) => {
    const data = await deleteUser(id);
    if (data.data) {
      alert(data.message);
      getUsers();
      return;
    }
    alert(data.message);
  };
  const handleEdit = async (id) => {
    const data = await getUser(id);
    setCurrentEle(<EditUser key={data.name} userdata={data} />);
  };

  const getUsersByname = async () => {
    const response = await fetch(`http://localhost:7000/api/user/search/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await response.json();
    return data;
  };

  const handleSearch = async () => {
    const resp = await getUsersByname();
    setUsers([...resp]);
    setQuery("");
  };

  return (
    <div className="displayMain displayRoles">
      <div className="searchRole">
        <img src={userIcon} alt="home icon" className="sideIcon" />
        <p>Users</p>
        <div className="sb-search">
          <IconButton onClick={handleSearch}>
            <SearchIcon className="icon" />
          </IconButton>
          <input
            className="search-box"
            placeholder="search"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <button onClick={() => handleAddrole(<AddUser />)}>Add New</button>
      </div>
      <div className="rolesTableContainer">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.role}</td>
                  <td
                    style={user.status ? { color: "green" } : { color: "red" }}
                  >
                    {user.status ? "active" : "inActive"}
                  </td>
                  <td className="actionIcon">
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleDelete(user._id)}
                    />
                    <EditNoteOutlinedIcon
                      onClick={() => handleEdit(user._id)}
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

export default UsersContainer;
