import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const cssClass = ({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "navlink";
    
  return (
    <header className="header">
      <h1>Restaurant Finder</h1>
        <NavLink className={cssClass} to="/">
            Home
          </NavLink>
          <NavLink className={cssClass} to="/about">
            About
          </NavLink>
          <NavLink className={cssClass} to="/profile">
            Profile
          </NavLink>
    </header>
  );
};

export default Header;
