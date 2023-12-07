import React, { useState, useEffect } from "react";
// import "./App.css";

function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/favoriteRestaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Error fetching favorite restaurants:", error);
      });
  }, []);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const renderFavorites = () => {
    return favorites.map((restaurant, index) => (
      <li key={index}>{restaurant.name}</li>
    ));
  };

  return (
    <div>
      <h4>My Favorite Restaurants</h4>
      <button onClick={toggleFavorites}>
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </button>
      {showFavorites && <ul>{renderFavorites()}</ul>}
    </div>
  );
}

export default Profile;
