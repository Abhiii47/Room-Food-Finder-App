import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../api/listings';
import AuthContext from '../context/AuthContext';
import '../styles/Form.css';

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    listingType: 'room', // Default to 'room'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);


  const { title, description, price, imageUrl, listingType } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError('You must be logged in to create a listing.');
      return;
    }

    try {
      
      setSuccess('Listing created successfully! Redirecting...');
      
      // Use window.location.href to force a full page reload
      setTimeout(() => {
        window.location.href = '/listings';
      }, 1500); // Wait 1.5 seconds to show the success message

    } catch (err) {
      setError(err);
      console.error('Failed to create listing:', err);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Create a New Listing</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Listing Title" name="title" value={title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <textarea className="form-input" placeholder="Description" name="description" value={description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="number" className="form-input" placeholder="Price" name="price" value={price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Image URL" name="imageUrl" value={imageUrl} onChange={handleChange} />
          </div>
          <div className="form-group">
            <select className="form-input" name="listingType" value={listingType} onChange={handleChange}>
              <option value="room">Room</option>
              <option value="food">Food</option>
            </select>
          </div>
          <button type="submit" className="form-button">Create Listing</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;