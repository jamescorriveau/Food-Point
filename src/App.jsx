import { useState, useEffect } from "react";
import "./App.css";
import RestaurantList from "./Components/RestaurantList";
import RestaurantSearch from "./Components/RestaurantSearch";
import Header from "./Header";

function App() {
  let [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const url =
      "https://maps-data.p.rapidapi.com/searchmaps.php?query=restaurant&limit=20&country=us&lang=en&lat=40.7128&lng=-74.006&offset=0&zoom=13";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3a907745f5msh22b6f4061fe0039p156641jsn530f785f876f",
        "X-RapidAPI-Host": "maps-data.p.rapidapi.com",
      },
    };

    console.log("Fetching...");

    fetch(url, options).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setResults(data.data);
          console.log(results)
        });
      } else {
        res.json().then((err) => setErrors(err));
      }
    });
  }, []);

function onSearch(term) {
  setSearchTerm(term);
}


const filteredResults = results.filter((result) =>  result.name.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="background">
      <Header />
      <RestaurantSearch restaurants={filteredResults} onSearch={onSearch} searchTerm={searchTerm}/>
      {results.length > 0 ? (
        <RestaurantList results={filteredResults}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
