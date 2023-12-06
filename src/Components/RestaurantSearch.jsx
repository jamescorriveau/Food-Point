import React from "react";

const RestaurantSearch = ({ restaurants }) => {
  return (
    <div>
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
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
