import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyListings, deleteListing } from '../api/listings';
import '../styles/MyListings.css';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const data = await getMyListings();
      setListings(data);
    } catch (err) {
      setError('Failed to fetch your listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  // This function was missing
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this listing?')) {
      try {
        await deleteListing(id);
        // Refetch the listings to update the view
        fetchMyListings();
      } catch (err) {
        setError('Failed to delete listing. Please try again.');
      }
    }
  };

  if (loading) return <p>Loading your listings...</p>;

  return (
    <div className="my-listings-container">
      <h2>My Listings</h2>
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && listings.length === 0 ? (
        <div className="no-listings-card">
          <p>You have not created any listings yet.</p>
          <Link to="/dashboard/create-listing" className="btn-primary">Create Your First Listing</Link>
        </div>
      ) : (
        <div className="listings-table">
          <div className="table-header">
            <div>Listing</div>
            <div>Actions</div>
          </div>
          {listings.map((listing) => (
            <div key={listing._id} className="listing-row">
              <img src={listing.imageUrl || 'https://placehold.co/100x100'} alt={listing.title} />
              <div className="listing-info">
                <h3>{listing.title}</h3>
                <p>${listing.price}/month</p>
              </div>
              <div className="listing-actions">
                <Link to={`/edit-listing/${listing._id}`} className="btn-edit">
                  Edit
                </Link>
                <button onClick={() => handleDelete(listing._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
