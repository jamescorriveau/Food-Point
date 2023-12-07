import React, { useState, useEffect } from "react";
import "./App.css";
import RestaurantList from "./Components/RestaurantList";
import RestaurantSearch from "./Components/RestaurantSearch";

import { useOutletContext } from "react-router-dom";

function App() {
  const searchTerm = useOutletContext();

  console.log(searchTerm);

  let [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const url =
      "https://maps-data.p.rapidapi.com/searchmaps.php?query=restaurant&limit=20&country=us&lang=en&lat=40.7128&lng=-74.006&offset=0&zoom=13";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "25cd163a55msh8de58ba6d3cc121p11303djsn2749a2d3743f",
        "X-RapidAPI-Host": "maps-data.p.rapidapi.com",
      },
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
  }, []);

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
