import React from 'react';
import { createContext, useState, useEffect, useMemo } from 'react';

export const initialState = { 
  theme: 'light', 
  data: [],
  searchTerm: '' 
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    document.body.className = state.theme;
  }, [state.theme]);

  const toggleTheme = () => {
    setState((prevState) => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        data: data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1
        })),
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setSearchTerm = (term) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: term
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      toggleTheme,
      setSearchTerm
    }),
    [state]
  ); 

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  );
};