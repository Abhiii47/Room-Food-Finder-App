import React, { useState, useEffect } from 'react';
import { getListings } from '../api/listings';
import '../styles/Listings.css';
import { Link } from 'react-router-dom';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'room', 'food'

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (err) {
        setError('Could not fetch listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter(({ listingType }) =>
    filter === 'all' || listingType === filter
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading listings...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="listings-page">
      <div className="container">
        <header className="listings-header">
          <h1>Explore Rooms & Food Services</h1>
          <p>Find the perfect place to stay and the best meals near you.</p>
          <div className="filter-buttons">
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => setFilter('room')} className={filter === 'room' ? 'active' : ''}>Rooms</button>
            <button onClick={() => setFilter('food')} className={filter === 'food' ? 'active' : ''}>Food</button>
          </div>
        </header>

        {!loading && filteredListings.length === 0 ? (
          <div className="no-listings">
            <h2>No listings found for "{filter}".</h2>
            <p>Be the first to offer a service!</p>
          </div>
        ) : (
          <div className="listing-grid">
            {filteredListings.map(({ _id, imageUrl, title, description, listingType, price }) => (
              <div key={_id} className="listing-card">
                <img
                  src={imageUrl || 'https://placehold.co/600x400/EEE/31343C?text=No+Image'}
                  alt={title}
                  className="listing-image"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/EEE/31343C?text=Image+Error'; }}
                />
                <div className="listing-content">
                  <span className={`listing-type ${listingType}`}>{listingType}</span>
                  <h3>{title}</h3>
                  <p className="listing-description">{description}</p>
                  <div className="listing-footer">
                    <span className="listing-price">${price}/month</span>
                    <Link to={`/listings/${_id}`} className="details-button">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <section className="vendor-cta">
          <h2>Are you a Vendor?</h2>
          <p>Share your services with thousands of students and grow your business.</p>
          <Link to="/create-listing" className="btn-cta">Create a Listing</Link>
        </section>
      </div>
    </div>
  );
};

export default ListingsPage;