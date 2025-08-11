import React from 'react';
import '../styles/HomePage.css'; // Import a dedicated CSS file

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

      <section className="featured-listings">
        <div className="container">
          <h2>Featured Listings</h2>
          {/* We will add listing cards here later */}
          <div className="listing-grid">
            <div className="listing-card">Listing 1</div>
            <div className="listing-card">Listing 2</div>
            <div className="listing-card">Listing 3</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;