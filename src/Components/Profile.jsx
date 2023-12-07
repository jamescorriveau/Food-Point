import React, { useState } from "react";

function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const addFavorite = (e) => {
    e.preventDefault();
    if (newFavorite && !favorites.includes(newFavorite)) {
      setFavorites([...favorites, newFavorite]);
      setNewFavorite(""); // Reset input field after adding
    }
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  // Function to render favorite restaurants
  const renderFavorites = () => {
    return favorites.map((restaurant, index) => (
      <li key={index}>{restaurant}</li>
    ));
  };

  return (
    <div>
      <h4>My Favorite Restaurants</h4>
      <form onSubmit={addFavorite}>
        <input
          type="text"
          value={newFavorite}
          onChange={(e) => setNewFavorite(e.target.value)}
          placeholder="Add a favorite restaurant"
        />
        <button type="submit">Add</button>
      </form>

      <button onClick={toggleFavorites}>
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </button>

      {showFavorites && <ul>{renderFavorites()}</ul>}
    </div>
  );
}

export default Profile;
