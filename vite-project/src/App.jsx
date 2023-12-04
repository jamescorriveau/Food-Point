import { useState, useEffect } from 'react';
import './App.css';
import RestaurantList from './RestaurantList';

function App() {
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({})

  useEffect(() => {
      const url = 'https://maps-data.p.rapidapi.com/searchmaps.php?query=restaurant&limit=20&country=us&lang=en&lat=40.7128&lng=-74.006&offset=0&zoom=13';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '3a907745f5msh22b6f4061fe0039p156641jsn530f785f876f',
          'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
        }
      };

    console.log("Fetching...")

    fetch(url, options)
    .then(res => {
      if (res.status === 200 ){
        res.json()
        .then( data => {
          setResults(data.data)
        })
      }

      else{ 
        res.json()
        .then(err => setErrors(err))
      }

    })
   

  }, []);// empty dependency array to run the effect only once when the component mounts

  return (
    
      <div>
      
              {results ? (
          <>
            <RestaurantList results={results} />
            
          </>
        ) : (
          <p>Loading...</p>
        )}

        </div>

  )
}

export default App;
