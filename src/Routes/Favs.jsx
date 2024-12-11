import React, { useState, useEffect, useContext } from "react";
import Card from "../Components/Card";
import { ContextGlobal } from '../Components/utils/global.context';

const Favs = () => {
  const { searchTerm } = useContext(ContextGlobal);
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const filtered = favorites
      .filter(fav => 
        fav.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 49);
    
    setFilteredFavorites(filtered);
  }, [favorites, searchTerm]);

  const handleFavRemove = (removedId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== removedId);
    setFavorites(updatedFavorites);
  }

  return (
    <>
      <h1>Pokémones Favoritos</h1>
      <div className="card-grid">
        {filteredFavorites.map(fav => (
          <Card 
            key={fav.id}
            id={fav.id}
            name={fav.name}
            image={fav.image}
            showFavButton={false}
            onFavRemove={handleFavRemove}
          />
        ))}
      </div>
      {filteredFavorites.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No se encontraron Pokémones favoritos.
        </p>
      )}
    </>
  );
};

export default Favs;