import { useState, useEffect } from "react";
import "./App.css";
import RestaurantList from "./Components/RestaurantList";
import RestaurantSearch from "./Components/RestaurantSearch";
import { FavoritesProvider } from './Components/FavoritesContext';
import Header from "./Header";

function App() {
  let [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const url =
      "https://maps-data.p.rapidapi.com/searchmaps.php?query=restaurant&limit=20&country=us&lang=en&lat=40.7128&lng=-74.006&offset=0&zoom=13";

  useEffect(() => {
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
        });
      } else {
        res.json().then((err) => setErrors(err));
      }
    });
  }, []);

function onSearch(term) {
  setSearchTerm(term);
}



const filteredResults = results.filter((result) => {
  const lowerCaseName = (result.name || '').toLowerCase();
  const lowerCaseDescription0 = (result.description[0] || '').toLowerCase();
  const lowerCaseDescription1 = (result.description[1] || '').toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return (
    lowerCaseName.includes(lowerCaseSearchTerm) ||
    lowerCaseDescription0.includes(lowerCaseSearchTerm) ||
    lowerCaseDescription1.includes(lowerCaseSearchTerm)
  );
});


  return (
    <FavoritesProvider>
      <div className="background">
        <Header />
        <RestaurantSearch restaurants={filteredResults} onSearch={onSearch} searchTerm={searchTerm}/>
        {results.length > 0 ? (
          <RestaurantList results={filteredResults} url={url}/>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;
