import React, { useState, useEffect, useHistory } from "react";
import "./App.css";
import RestaurantList from "./Components/RestaurantList";
// import RestaurantSearch from "./Components/RestaurantSearch";

import { useOutletContext } from "react-router-dom";

function App() {
  const searchTerm = useOutletContext();
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          const url = `https://maps-data.p.rapidapi.com/searchmaps.php?query=restaurant&limit=20&country=us&lang=en&lat=${latitude}&lng=${longitude}&offset=0&zoom=13`;

          const options = {
            method: "GET",
            headers: {
              'X-RapidAPI-Key': '4578ad90c0msh7185e76eb4a1d1ap1676a0jsn80fa8c573e3d',
              'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
            }
          };

          console.log("Fetching...");

          fetch(url, options).then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                setResults(data.data);
                console.log(results);
              });
            } else {
              res.json().then((err) => setErrors(err));
            }
          });
        },
        function (error) {
          // Handle errors, if any
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []); // Empty dependency array to ensure this effect runs only once

  const filteredResults = results.filter((result) =>
    result.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="background">
      {results.length > 0 ? (
        <RestaurantList results={filteredResults} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
