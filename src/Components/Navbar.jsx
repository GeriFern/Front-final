import React, { useContext } from 'react'
import { ContextGlobal } from './utils/global.context'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Search } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, data, setSearchTerm } = useContext(ContextGlobal);
  const navigate = useNavigate();
  const location = useLocation();

  const buttonStyle = {
    background: 'none', 
    border: 'none', 
    cursor: 'pointer',
    color: theme === 'dark' ? 'white' : 'black'
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? (theme === 'dark' ? 'lightblue' : 'green') : (theme === 'dark' ? 'white' : 'black'),
    textDecoration: 'none',
    margin: '5px',
    fontWeight: isActive ? 'bold' : 'normal'
  });
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (location.pathname !== '/favs') {
      navigate('/');
    }
  }

  return (
    <nav className={`navbar ${theme}`}>
      <div>
        <NavLink to='/' style={navLinkStyle}>Inicio</NavLink>
        <NavLink to='/favs' style={navLinkStyle}>Favoritos</NavLink>
        <NavLink to='/contact' style={navLinkStyle}>Contacto</NavLink>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center',
          boxShadow: theme === 'dark' ? '0 0 5px rgba(255,255,255,0.3)' : '0 0 5px rgba(0,0,0,0.3)',
          borderRadius: '20px',
          backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0'
        }}>
          <input 
            type="text" 
            placeholder="Buscar Pokémon" 
            onChange={handleSearch}
            style={{
              padding: '8px 15px',
              paddingRight: '40px',
              border: 'none',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              color: theme === 'dark' ? 'white' : 'black',
              outline: 'none',
              width: '200px'
            }}
          />
          <Search 
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: theme === 'dark' ? 'white' : 'black'
            }} 
            size={18} 
          />
        </div>
        <button 
          onClick={toggleTheme} 
          style={buttonStyle}
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar;