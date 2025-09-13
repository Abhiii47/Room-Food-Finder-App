import React, { useState, useContext, useEffect } from 'react';
import { createListing } from '../api/listings';
import AuthContext from '../context/AuthContext';
import '../styles/Form.css';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    listingType: 'room',
    location: {
      address: '',
      latitude: null,
      longitude: null
    }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const { user } = useContext(AuthContext);

  const { title, description, price, imageUrl, listingType, location } = formData;

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }

    function initAutocomplete() {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('address-input'),
        { types: ['address'] }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setFormData(prev => ({
            ...prev,
            location: {
              address: place.formatted_address,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            }
          }));
        }
      });
    }
  }, []);

  // Check if user is a vendor
  useEffect(() => {
    if (user && user.userType !== 'vendor') {
      setError('Only vendors can create listings');
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === 'address') {
      setFormData({ 
        ...formData, 
        location: { ...formData.location, address: e.target.value }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!user) {
      setError('You must be logged in to create a listing.');
      setLoading(false);
      return;
    }

    if (user.userType !== 'vendor') {
      setError('Only vendors can create listings.');
      setLoading(false);
      return;
    }

    // Basic validation
    if (!title.trim() || !description.trim() || !price) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      setError('Please enter a valid price.');
      setLoading(false);
      return;
    }

    try {
      await createListing(formData);
      setSuccess('Listing created successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/dashboard/my-listings';
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create listing');
      console.error('Failed to create listing:', err);
    } finally {
      setLoading(false);
    }
  };

  if (user && user.userType !== 'vendor') {
    return (
      <div className="form-container">
        <div className="form-box">
          <h2>Access Denied</h2>
          <p>Only vendors can create listings. Please contact support if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Create New Listing</h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '2rem', 
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          Share your room or food service with students
        </p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-input" 
              placeholder="Listing Title *" 
              name="title" 
              value={title} 
              onChange={handleChange} 
              required 
              maxLength="100"
            />
          </div>
          
          <div className="form-group">
            <textarea 
              className="form-input" 
              placeholder="Description *" 
              name="description" 
              value={description} 
              onChange={handleChange} 
              required
              maxLength="500"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="number" 
              className="form-input" 
              placeholder="Price (per month) *" 
              name="price" 
              value={price} 
              onChange={handleChange} 
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <input 
              type="text"
              id="address-input"
              className="form-input" 
              placeholder="Address (Start typing for suggestions)" 
              name="address" 
              value={location.address} 
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <input 
              type="url" 
              className="form-input" 
              placeholder="Image URL (optional)" 
              name="imageUrl" 
              value={imageUrl} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <select 
              className="form-input" 
              name="listingType" 
              value={listingType} 
              onChange={handleChange}
            >
              <option value="room">🏠 Room</option>
              <option value="food">🍽️ Food Service</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className={`form-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating Listing...' : 'Create Listing'}
          </button>
        </form>
        
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: 'var(--secondary-bg)', 
          borderRadius: '12px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.4'
        }}>
          <strong>💡 Tips for a great listing:</strong>
          <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
            <li>Use a clear, descriptive title</li>
            <li>Include detailed address for better visibility</li>
            <li>Add high-quality images</li>
            <li>Set a competitive price</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
