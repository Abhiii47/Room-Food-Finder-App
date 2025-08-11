import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Room&FoodFinder
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/listings" className="nav-link">Listings</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;