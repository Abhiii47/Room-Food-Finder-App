import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import '../styles/Header.css';

// Professional SVG Icons
const SunIcon = () => (
  <svg xmlns="http://www.w.3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);


const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          Room&FoodFinder
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/listings" className="nav-link">Listings</Link>
          {user && (
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          )}
          
          <button className="icon-button theme-switcher" onClick={toggleTheme}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          {user ? (
            <div className="profile-section" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="icon-button profile-button">
                <UserIcon />
              </button>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">Welcome, {user.name || 'User'}</div>
                  <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)}>Settings</Link>
                  <Link to="/change-password" onClick={() => setDropdownOpen(false)}>Change Password</Link>
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
