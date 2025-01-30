import React, { useState } from "react";
import "../home.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContainer from "../components/MainContainer";
import HomeContainer from "../components/HomeContainer";
import { useDisplay } from "../contextAPI/displayEle";
const Home = () => {
    
  return (
    <div className="homeContainer">
      <Navbar />
      <div className="main">
        <Sidebar />
        <MainContainer/>
      </div>
    </div>
  );
};

export default Home;
