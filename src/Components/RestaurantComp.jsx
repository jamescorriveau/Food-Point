import React, { useState, useEffect } from "react";
import { useFavorites } from './FavoritesContext';

function RestaurantComp({ name, description, address, city, rating, review_count, open_state, types, hours, website, price_level, photos, restaurants, url }) {

  const { addToFavorites } = useFavorites();

  const [isShowingHours, setShowingHours] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    console.log("logging faves now");
    console.log(favoritesList);
  }, [favoritesList]);

  // function handleShowHours() {
  //   setShowingHours(!isShowingHours);
  // }

  function handleFavoriteTrue() {
    // handleFavorite() 

    const favoriteRestaurant = {
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
          };
      
          console.log('favorite restaurant!')
          console.log(favoriteRestaurant)
    
      addToFavorites(favoriteRestaurant);
  }

  function handleFavorite() {
    setFavorite(!isFavorite)
   
  }

  function addToFaves(newFave) {
    // Update the favoritesList state
    setFavoritesList((prevFavorites) => [...prevFavorites, newFave]);
  
    // Assuming you have a backend endpoint to save the favorites
    fetch(url, {
      method: 'POST',
      headers: {
        "X-RapidAPI-Key": "3a907745f5msh22b6f4061fe0039p156641jsn530f785f876f",
        "X-RapidAPI-Host": "maps-data.p.rapidapi.com",
      },
      body: JSON.stringify({ favoritesList: favoritesList }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Favorites saved successfully:', data);
      })
      .catch((error) => {
        console.error('Error saving favorites:', error);
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
        stars.push('🌕');
    }

    // Add a partial star if necessary
    if (partialStar===0.1 || partialStar===0.2 || partialStar===0.3) {
        stars.push('🌘');
    }

    if (partialStar===0.4 || partialStar===0.5 || partialStar===0.6) {
        stars.push('🌗'); 
    }

    if (partialStar===0.7 || partialStar===0.8 || partialStar===0.9) {
        stars.push('🌖'); 
    }

    if (rating === 4) {
        rating = rating.toFixed(1); // Convert to a string with one decimal place
        stars.push('🌑');
    }

    if (rating < 4 & rating > 3) {
        stars.push('🌑');
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


     
    
     

   return(
    <div className="restaurantContainer">
      <div className="restaurantCard">
        <h3 className="name">{name}</h3>

        <div className="infoRow">
          <div className="rating">{rating} {stars}</div>
          <div id="open" style={{ color: openStateColor }}>{openState}</div>
          <div id="price">{money}</div>
          <div>
            {isFavorite ?
            <button onClick={handleFavoriteTrue} style={{ backgroundColor: '#b2ebc1' }}>Added to Favorites ★</button>
            : <button onClick={handleFavorite} >Add to Favorites ☆</button>
            }
          </div>
        </div>

       

        {/* {isShowingHours ? <div onClick={handleShowHours}><strong>Hours ▲</strong></div>
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
        } */}

        <h4 className="description">
            {description[0]}
        </h4>
        {/* <div className="description">
            {description[1]}
        </div> */}
        </div>
    </div>
   )
}

export default RestaurantComp;
