import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ContextGlobal } from '../Components/utils/global.context';

const traduccionTipos = {
  normal: "Normal", fighting: "Lucha", flying: "Volador", 
  poison: "Veneno", ground: "Tierra", rock: "Roca", 
  bug: "Bicho", ghost: "Fantasma", steel: "Acero", 
  fire: "Fuego", water: "Agua", grass: "Planta", 
  electric: "Eléctrico", psychic: "Psíquico", 
  ice: "Hielo", dragon: "Dragón", 
  dark: "Siniestro", fairy: "Hada"
};

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const { data } = useContext(ContextGlobal);
  const [theme, setTheme] = useState('light');

  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteIds(storedFavorites.map(fav => fav.id));
  }, []);

  useEffect(() => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        setPokemon(data);

        const typeUrl = data.types[0].type.url;
        const typeResponse = await fetch(typeUrl);
        const typeData = await typeResponse.json();
        const typeWeaknesses = typeData.damage_relations.double_damage_from
          .map(type => traduccionTipos[type.name] || type.name);
        
        setWeaknesses(typeWeaknesses);
      } catch (error) {
        console.error('ERROR AL ENCONTRAR DETALLES:', error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  const handleNavigation = (direction) => {
    const path = window.location.pathname;
    const isFavoritesMode = path.includes('/favs');

    let pokemonIds;
    if (isFavoritesMode) {
      pokemonIds = favoriteIds;
    } else {
      pokemonIds = data.slice(0, 49).map(pokemon => pokemon.id);
    }

    const currentIndex = pokemonIds.indexOf(parseInt(id));
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % pokemonIds.length
      : (currentIndex - 1 + pokemonIds.length) % pokemonIds.length;
    
    const newId = pokemonIds[newIndex];
    navigate(`/detail/${newId}`);
  }

  if (!pokemon) return <div>CARGANDO...</div>;

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: theme === 'dark' ? '#4CAF50' : '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const hoverStyle = {
    backgroundColor: '#45a049'
  };

  return (
    <div>
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        margin: '0 20px'
      }}>
        {/* <button 
          onClick={() => handleNavigation('previous')}
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Anterior
        </button>
        <h1 style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          {pokemon.name.toUpperCase()}
        </h1>
        <button 
          onClick={() => handleNavigation('next')}
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Siguiente
        </button> */}
      </div>
      
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          style={{width: '300px', height: '300px'}}
        />
        <div>
          <p>ALTURA: {pokemon.height/10} metro</p>
          <p>PESO: {pokemon.weight/10} kilogramos</p>
          <p>TIPO: {pokemon.types.map(type => traduccionTipos[type.type.name] || type.type.name).join(', ')}</p>
          <p>HABILIDADES: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
          <p>DEBILIDADES: {weaknesses.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}

export default Detail;