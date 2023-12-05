import React, { useState } from "react";

const RestaurantSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [restaurants, setRestaurants] = useState([
    // Populate this array with your restaurant data
    // { name: 'Restaurant 1', location: 'Location 1' },
    // { name: 'Restaurant 2', location: 'Location 2' },
    // ...
  ]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredRestaurants =
    searchInput.length > 0
      ? restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : restaurants;

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        className="city-input"
      />

      <table>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Location</th>
          </tr>
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
