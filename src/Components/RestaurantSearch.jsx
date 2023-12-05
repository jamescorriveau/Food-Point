import React, { useState } from "react";
// import "./App.css";

const RestaurantSearch = ({ restaurants, onSearch, searchTerm}) => {
  
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("restaurants")
    console.log(restaurants)
    const filtered =
      searchTerm.length > 0
        ? restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : restaurants;

    setFilteredRestaurants(filtered);
    onSearch(searchTerm)

  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        value={searchTerm}
        className="search-restaurant"
        onChange={handleChange}
        // onChange={(e) => onSearch(e.target.value)}
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
