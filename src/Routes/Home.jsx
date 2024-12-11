import React, { useContext, useEffect, useState } from 'react'
import Card from '../Components/Card'
import { ContextGlobal } from '../Components/utils/global.context'

const Home = () => {
  const { data, searchTerm } = useContext(ContextGlobal);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const initialPokemonSlice = data.slice(0, 49);

        if (!searchTerm) {
          const pokemonPromises = initialPokemonSlice.map(pokemon => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`).then(res => res.json())
          );

          const pokemonResults = await Promise.all(pokemonPromises);
          setDisplayedPokemons(pokemonResults);
        } else {
          const filtered = initialPokemonSlice.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          const pokemonPromises = filtered.map(pokemon => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`).then(res => res.json())
          );

          const pokemonResults = await Promise.all(pokemonPromises);
          setDisplayedPokemons(pokemonResults);
        }
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemonDetails();
  }, [data, searchTerm]);

  return (
    <main>
      <h1>Pokémones</h1>
      <div className='card-grid'>
        {displayedPokemons.map(pokemon => (
          <Card 
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
          />
        ))}
      </div>
    </main>
  )
}

export default Home;