import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ searchTerm, onSearch}) => {
  
  const handleChange = (e) => {
    onSearch(e.target.value);
  };


  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo-title-container">
        <img
          src="https://logodix.com/logo/1195872.png"
          alt="Food Pointer Logo"
          className="logo"
        />
        <h2 className="foodPointerTitle">Food Point</h2>
      </div>
      <div>
        <NavLink to="/" onClick={handleHomeClick}>
          Home
        </NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
  
      <div className="search-container">
        <input
          type="search"
          placeholder="Search below list"
          value={searchTerm}
          className="search-restaurant"
          onChange={handleChange}
        />
        <button onClick={() => onSearch(searchTerm)}>Search</button>
      </div>
    </header>
  );
};

export default Header;
