import React from 'react';
import { Link } from 'react-router-dom';

// contexts
import { useTheme } from '../../hooks/useTheme';

// styles
import './Navbar.css';

// components
import SearchBar from '../../components/search/SearchBar';

export default function Navbar() {

  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <SearchBar className="search"/>
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  )
}
