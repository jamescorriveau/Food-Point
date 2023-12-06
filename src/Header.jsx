import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ searchTerm, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <h2>Food Pointer</h2>
      {/* <img
        src="https://www.logoground.com/uploadthumbs12/dv12y2023645402023-07-043498290rooster4.jpg"
        alt="Restaurant Finder"
      /> */}
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div className="search-container">
        <input
          type="search"
          placeholder="Search here"
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
