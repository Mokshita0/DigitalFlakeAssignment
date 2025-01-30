import React from 'react'
import "../home.css"
import logoImg from "../assets/logoMain.png"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();

   const handleLogout=()=>{
      alert("Do you want to LogOut?");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/");
  }
  return (
    <div className='navbarContainer'>
        <div className='logoMain'>
            <img src={logoImg} alt="logo" />
        </div>
        <AccountCircleOutlinedIcon  className='profileIcon' style={{ fontSize: 45 }} onClick={handleLogout}/>
        
    </div>
  )
}

export default Navbar