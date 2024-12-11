import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Notification from "./Notification";

const traduccionTipos = {
  normal: "Normal", fighting: "Lucha", flying: "Volador", 
  poison: "Veneno", ground: "Tierra", rock: "Roca", 
  bug: "Bicho", ghost: "Fantasma", steel: "Acero", 
  fire: "Fuego", water: "Agua", grass: "Planta", 
  electric: "Eléctrico", psychic: "Psíquico", 
  ice: "Hielo", dragon: "Dragón", 
  dark: "Siniestro", fairy: "Hada"
};

const Card = ({ id, name, image, showFavButton = true, onFavRemove }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
      }
    };

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === id));

    fetchPokemonDetails();
  }, [id]);

  const addFav = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some(fav => fav.id === id)) {
      const newFavorite = { 
        id, 
        name, 
        image,
        type: pokemonDetails?.types[0].type.name
      };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      setNotification(`${name.charAt(0).toUpperCase() + name.slice(1)} agregado a favoritos`);
    }
  }

  const removeFav = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(false);
    
    if (onFavRemove) {
      onFavRemove(id);
    }
    setNotification(`${name.charAt(0).toUpperCase() + name.slice(1)} removido de favoritos`);
  }

  const renderPokemonInfo = () => {
    if (!pokemonDetails) return 'Cargando...';
    
    const type = pokemonDetails.types[0].type.name;
    return (
      <p>Tipo: {traduccionTipos[type] || type}</p>
    );
  }

  return (
    <div className="card">
      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification(null)} 
        />
      )}
      <h3>{name.toUpperCase()}</h3>
      <img 
        src={image} 
        alt={name} 
        style={{width: '150px', height: '150px'}}
      />
      {pokemonDetails && renderPokemonInfo()}
      <div className="card-buttons">
        <Link to={`/detail/${id}`}>
          <button className="details-button">
            Ver Detalles
          </button>
        </Link>
        {showFavButton && (
          <button 
            onClick={addFav} 
            className="fav-button" 
            disabled={isFavorite}
          >
            {isFavorite ? 'Agregado' : 'Agregar a Favoritos'}
          </button>
        )}
        {!showFavButton && (
          <button 
            onClick={removeFav} 
            className="remove-fav-button"
          >
            Quitar de Favoritos
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;