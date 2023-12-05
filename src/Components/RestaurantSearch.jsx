import React, { useState } from "react";
// import "./App.css";

const RestaurantSearch = ({ restaurants }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const filtered =
      searchInput.length > 0
        ? restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        : restaurants;

    setFilteredRestaurants(filtered);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        className="search-restaurant"
      />
      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {filteredRestaurants.map((restaurant, index) => (
            <tr key={index}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantSearch;
