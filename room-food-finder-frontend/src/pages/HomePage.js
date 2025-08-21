import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

// SVG Icons for categories
const RoomIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const FoodIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18M12 2a9 9 0 0 1 9 9v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a9 9 0 0 1 9-9z"></path><path d="M7 11v1a5 5 0 0 0 10 0v-1"></path></svg>;
const ApartmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Room & Food</h1>
          <p className="hero-subtitle">
            Discover a place to stay or your next meal, all in one place.
          </p>
          <form className="search-form">
            <input type="text" placeholder="Search for location, e.g., 'Koregaon Park'" className="search-input" />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </section>

      <section className="browse-category">
        <div className="container">
          <h2>Browse by Category</h2>
          <div className="category-grid">
            <Link to="/listings?filter=room" className="category-card">
              <RoomIcon />
              <h3>Private Rooms</h3>
              <p>Find your own private space.</p>
            </Link>
            <Link to="/listings?filter=food" className="category-card">
              <FoodIcon />
              <h3>Food Services</h3>
              <p>Discover delicious local meals.</p>
            </Link>
            <Link to="/listings?filter=apartment" className="category-card">
              <ApartmentIcon />
              <h3>Apartments</h3>
              <p>Explore entire apartments.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
