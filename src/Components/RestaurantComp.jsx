import React, { useState, useEffect } from "react";

function RestaurantComp({
  id,
  name,
  description,
  address,
  city,
  rating,
  review_count,
  open_state,
  types,
  hours,
  website,
  price_level,
  photos,
}) {

  const restaurant = {
  id,
  name,
  description,
  address,
  city,
  rating,
  review_count,
  open_state,
  types,
  hours,
  website,
  price_level,
  photos,
  }
  const [isShowingHours, setShowingHours] = useState(false);

  const [isFavorite, setFavorite] = useState(true);

  useEffect(() => {
    // Fetch the list of favorite restaurants when the component mounts
    fetch('http://localhost:3000/favoriteRestaurants')
      .then(response => response.json())
      .then(existingFavorites => {
        // Check if the current restaurant is in the list of favorites
        const isAlreadyFavorite = existingFavorites.some(
          favorite => favorite.name === name
        );
        setFavorite(!isAlreadyFavorite); // Reverse the logic
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }, [name]);

  function handleShowHours() {
    setShowingHours(!isShowingHours);
  }

  // making component into something I can pass 


  function handleFavorite() {
    // Invert the favorite state locally
    setFavorite(!isFavorite);
  
    // Fetch the current list of favorite restaurants from the server
    fetch('http://localhost:3000/favoriteRestaurants')
      .then(response => response.json())
      .then(existingFavorites => {
        // Check if the restaurant already exists in the favorites
        const isAlreadyFavorite = existingFavorites.some(
          favorite => favorite.name === restaurant.name
        );
  
        // If the restaurant is not already a favorite, add it to the server
        if (!isAlreadyFavorite) {
          fetch('http://localhost:3000/favoriteRestaurants', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurant),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Response:', data);
              // Handle the response data as needed
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }
  
  
  function handleUnfavorite() {
    setFavorite(!isFavorite);
  
    // Fetch the list of favorite restaurants when the component mounts
    fetch('http://localhost:3000/favoriteRestaurants')
      .then(response => response.json())
      .then(existingFavorites => {
        // Find the index of the current restaurant in the list of favorites
        const indexToRemove = existingFavorites.findIndex(
          favorite => favorite.name === restaurant.name
        );
  
        if (indexToRemove !== -1) {
          let deleteThisIndex = indexToRemove+1
          // If the restaurant is found in the list, send a DELETE request to remove it
          const encodedName = encodeURIComponent(restaurant.name); // Encode special characters
          console.log(`DELETE URL: http://localhost:3000/favoriteRestaurants/${deleteThisIndex}`);
          fetch(`http://localhost:3000/favoriteRestaurants/${indexToRemove}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurant),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log('Response:', data);
              // Handle the response data as needed
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }
  
  
  

  const stars = [];

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Check if there's a fractional part
  let partialStar = rating % 1;
  partialStar = Math.round(partialStar * 10) / 10;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push("🌕");
  }

  // Add a partial star if necessary
  if (partialStar === 0.1 || partialStar === 0.2 || partialStar === 0.3) {
    stars.push("🌘");
  }

  if (partialStar === 0.4 || partialStar === 0.5 || partialStar === 0.6) {
    stars.push("🌗");
  }

  if (partialStar === 0.7 || partialStar === 0.8 || partialStar === 0.9) {
    stars.push("🌖");
  }

  if (rating === 4) {
    rating = rating.toFixed(1); // Convert to a string with one decimal place
    stars.push("🌑");
  }

  if ((rating < 4) & (rating > 3)) {
    stars.push("🌑");
  }

  if (!stars || stars.length === 0) {
    // Check if stars is undefined or empty
    stars.push("  No Rating  "); // Push five empty spaces into the array
  }

  let money;

  if (price_level === "$$$") {
    money = "💰💰💰";
  } else if (price_level === "$$") {
    money = "💰💰  ";
  } else if (price_level === "$") {
    money = "💰   ";
  } else {
    money = "   ";
  }

  const getOpenStateColor = () => {
    if (open_state.toLowerCase().includes("open")) {
      return "green";
    } else if (open_state.toLowerCase().includes("closed")) {
      return "red";
    } else {
      return "black"; // Default color if neither "open" nor "closed"
    }
  };

  const openStateColor = getOpenStateColor();

  const getOpenState = () => {
    if (open_state.toLowerCase().includes("open")) {
      return "Open";
    } else if (open_state.toLowerCase().includes("closed")) {
      return "Closed";
    }
  };

  const openState = getOpenState();

  return (
    <div className="restaurantContainer">
      <div className="restaurantCard">
        <h3 className="name">{name}</h3>

        <div className="infoRow">
          <div className="rating">
            {rating} {stars}
          </div>
          <div id="open" style={{ color: openStateColor }}>
            {openState}
          </div>
          <div id="price">{money}</div>
          <div>
          {isFavorite ? (
            <button onClick={handleFavorite}>Add to Favorites ☆</button>
          ) : (
            <button onClick={handleUnfavorite} style={{ backgroundColor: '#b2ebc1' }}>
              Added to Favorites ★
            </button>
          )}
        </div>
        </div>

        {isShowingHours ? <div onClick={handleShowHours}><strong>Hours ▲</strong></div>
        : <div onClick={handleShowHours}><strong>Hours ▼</strong></div>
        }

        {isShowingHours ? <div id='hours'> 
            <div><strong>Monday:</strong> {hours.Monday[0]}</div>
            <div><strong>Tuesday:</strong> {hours.Tuesday[0]}</div>
            <div><strong>Wednesday:</strong> {hours.Wednesday[0]}</div>
            <div><strong>Thursday:</strong> {hours.Thursday[0]}</div>
            <div><strong>Friday:</strong> {hours.Friday[0]}</div>
            <div><strong>Saturday:</strong> {hours.Saturday[0]}</div>
            <div><strong>Sunday:</strong> {hours.Sunday[0]}</div>
            
        </div> : null
        }

        <h4 className="description">{description[0]}</h4>
        {/* <div className="description">
            {description[1]}
        </div> */}
      </div>
    </div>
  );
}

export default RestaurantComp;
