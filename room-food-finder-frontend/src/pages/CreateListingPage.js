import React, { useState, useContext } from 'react';
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
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const { title, description, price, imageUrl, listingType } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        window.location.href = '/listings';
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create listing');
      console.error('Failed to create listing:', err);
    } finally {
      setLoading(false);
    }
  };

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
          Share your room or food service with the community
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
            <li>Include all important details in the description</li>
            <li>Add high-quality images if possible</li>
            <li>Set a fair and competitive price</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
