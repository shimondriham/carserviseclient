import React, { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaSatelliteDish } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import "../css/navCooper.css";

function NavCooper(props) {
  let setStyle = props.setStyle;
  const [activeNav, setActiveNav] = useState("#");
  return (
    <nav className="nav-cooper">
      <button
        onClick={() => {
          setActiveNav("#");
          setStyle("mapbox://styles/mapbox/streets-v11");
        }}
        className={activeNav === "#" ? "active" : ""}
      >
        <FaMapMarkedAlt />
      </button>
      <button
        onClick={() => {
          setActiveNav("#satellite");
          setStyle("mapbox://styles/mapbox/satellite-v9");
        }}
        className={activeNav === "#satellite" ? "active" : ""}
      >
        <FaSatelliteDish />
      </button>
      <button
        onClick={() => {
          setActiveNav("#dark");
          setStyle("mapbox://styles/mapbox/dark-v10");
        }}
        className={activeNav === "#dark" ? "active" : ""}
      >
        <BsMoon />
      </button>
    </nav>
  );
};

export default NavCooper;

