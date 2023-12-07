import React, { useState, useEffect } from "react";
import '/Users/maddieweber/Development/code/phase-2/phase-2-project/src/App.css'
import ProfileChild from "./ProfileChild";

function Profile() {
  const [favorites, setFavorites] = useState([]);
  let restaurants;
  

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

  restaurants = favorites.map((result) => (
    <ProfileChild 
    key={result.business_id}
    busId={result.business_id}
      name={result.name}
      description={result.description}
      address={result.address}
      city={result.city}
      rating={result.rating}
      review_count={result.review_count}
      open_state={result.open_state}
      types={result.types}
      hours={result.hours}
      website={result.website}
      price_level={result.price_level}
      photos={result.photos}
    />

    
  ));
  console.log('restaurnats inside profile')
    console.log(restaurants)

    return <div key={favorites.business_id}>{restaurants}</div>;
  
}

export default Profile;
