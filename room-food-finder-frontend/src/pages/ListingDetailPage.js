import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListingById } from '../api/listings';
import '../styles/ListingDetail.css';

const ListingDetailPage = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        setListing(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!listing) {
    return <div className="error-container">Listing not found.</div>;
  }

  return (
    <div className="listing-detail-page">
      <div className="container">
        <Link to="/listings" className="back-link">← Back to Listings</Link>
        <div className="detail-card">
          <img 
            src={listing.imageUrl || 'https://placehold.co/1200x600/EEE/31343C?text=No+Image'} 
            alt={listing.title} 
            className="detail-image"
          />
          <div className="detail-content">
            <span className={`listing-type ${listing.listingType}`}>{listing.listingType}</span>
            <h1>{listing.title}</h1>
            <p className="vendor-info">Listed by: <strong>{listing.vendor?.name || 'Unknown'}</strong></p>
            <p className="detail-description">{listing.description}</p>
            <div className="detail-footer">
              <span className="detail-price">${listing.price}/month</span>
              <button className="contact-button">Contact Vendor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
