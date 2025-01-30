import React from "react";
import HomeContainer from "./HomeContainer";
import RolesContainer from "./RolesContainer";
import AddRole from "./AddRole";
import EditRole from "./EditRole";
import { Outlet } from "react-router-dom";
import { useDisplay } from "../contextAPI/displayEle";

const MainContainer = () => {
    const {currentEle, setCurrentEle}=useDisplay();
  return (
    <div className="displayContainer">
      {currentEle}
      {/* <HomeContainer/> */}
      {/* <RolesContainer/> */}
      {/* <AddRole/> */}
      {/* <EditRole/> */}
    </div>
  );
};

export default MainContainer;
