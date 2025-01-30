import React from "react";
import homeIcon from "../assets/homeIcon.png";
import jobOffer from "../assets/job-offer.png";
import userIcon from "../assets/userIcon.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HomeContainer from "./HomeContainer";
import RolesContainer from "./RolesContainer";
import { useDisplay } from "../contextAPI/displayEle";
import UsersContainer from "./UsersContainer";
const Sidebar = () => {
  const { currentEle, setCurrentEle } = useDisplay();
  const handleDisplay = (Ele) => {
    setCurrentEle(Ele);
  };
  return (
    <div className="sideBarContainer">
      <div
        className="sideItem"
        onClick={() => handleDisplay(<HomeContainer />)}
      >
        <img src={homeIcon} alt="home icon" className="sideIcon" />
        <p>Home</p>
        <ArrowRightIcon style={{ fontSize: 40 }} />
      </div>
      <div
        className="sideItem"
        onClick={() => handleDisplay(<RolesContainer />)}
      >
        <img src={jobOffer} alt="home icon" className="sideIcon" />
        <p>Roles</p>
        <ArrowRightIcon style={{ fontSize: 40 }} />
      </div>
      <div className="sideItem" onClick={() => handleDisplay(<UsersContainer />)}>
        <img src={userIcon} alt="home icon" className="sideIcon" />
        <p>Users</p>
        <ArrowRightIcon style={{ fontSize: 40 }} />
      </div>
    </div>
  );
};

export default Sidebar;
