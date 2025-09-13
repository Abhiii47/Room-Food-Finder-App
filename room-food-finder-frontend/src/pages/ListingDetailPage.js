import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListingById } from '../api/listings';
import { startChat } from '../api/chat';
import AuthContext from '../context/AuthContext';
import '../styles/ListingDetail.css';

// Google Maps Component
const GoogleMap = ({ latitude, longitude, address }) => {
  useEffect(() => {
    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      const location = { lat: latitude || 18.5204, lng: longitude || 73.8567 }; // Default to Pune
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
      });
      
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: address || 'Listing Location'
      });
    }
  }, [latitude, longitude, address]);

  return <div id="map" style={{ height: '300px', width: '100%', borderRadius: '8px' }}></div>;
};

const ListingDetailPage = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contactLoading, setContactLoading] = useState(false);
  const { user } = useContext(AuthContext);
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

  const handleContactVendor = async () => {
    if (!user) {
      alert('Please login to contact the vendor');
      return;
    }

    if (user.userType !== 'student') {
      alert('Only students can contact vendors');
      return;
    }

    if (user.id === listing.vendor._id) {
      alert('You cannot contact yourself');
      return;
    }

    setContactLoading(true);
    try {
      const chatId = await startChat(user.id, listing.vendor._id);
      // Redirect to chat with the specific conversation
      window.location.href = `/dashboard/chat?chatId=${chatId}`;
    } catch (err) {
      alert('Failed to start chat: ' + err.message);
    } finally {
      setContactLoading(false);
    }
  };

  const handleBookListing = () => {
    if (!user) {
      alert('Please login to book this listing');
      return;
    }

    if (user.userType !== 'student') {
      alert('Only students can book listings');
      return;
    }

    // For now, we'll just contact the vendor
    // Later you can implement a proper booking system
    handleContactVendor();
  };

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
            
            {/* Location and Map Section */}
            {listing.location && (
              <div className="location-section">
                <h3>Location</h3>
                {listing.location.address && <p>{listing.location.address}</p>}
                <GoogleMap 
                  latitude={listing.location.latitude}
                  longitude={listing.location.longitude}
                  address={listing.location.address}
                />
              </div>
            )}
            
            <div className="detail-footer">
              <span className="detail-price">${listing.price}/month</span>
              <div className="action-buttons">
                {user && user.userType === 'student' && user.id !== listing.vendor._id && (
                  <>
                    <button 
                      className="contact-button"
                      onClick={handleContactVendor}
                      disabled={contactLoading}
                    >
                      {contactLoading ? 'Starting Chat...' : 'Contact Vendor'}
                    </button>
                    <button 
                      className="book-button"
                      onClick={handleBookListing}
                    >
                      Book Now
                    </button>
                  </>
                )}
                {!user && (
                  <Link to="/login" className="contact-button">
                    Login to Contact
                  </Link>
                )}
                {user && user.userType === 'vendor' && user.id !== listing.vendor._id && (
                  <p>Only students can contact vendors</p>
                )}
                {user && user.id === listing.vendor._id && (
                  <p>This is your listing</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
