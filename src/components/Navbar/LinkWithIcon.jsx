import React from "react";
import "./LinkWithIcon.css";
import { NavLink } from "react-router-dom";

const LinkWithIcon = ({ icon, title, link, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={
        sidebar
          ? "align_center link_icon link_sidebar"
          : "link_icon align_center"
      }
    >
      {title}
      <img className="link_img" src={icon} alt="rocket"></img>
    </NavLink>
  );
};

export default LinkWithIcon;
