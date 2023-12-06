import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState([]);

  const addToFavorites = (newFave) => {
    setFavoritesList((prevFavorites) => [...prevFavorites, newFave]);
  };

  useEffect(() => {
    console.log('Current favoritesList:', favoritesList);
  }, [favoritesList]);

  return (
    <FavoritesContext.Provider value={{ favoritesList, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
``