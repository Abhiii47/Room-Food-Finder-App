import React, { useState, useContext } from 'react';
import { createListing } from '../api/listings'; // Now actually used
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
      await createListing(formData);
      setSuccess('Listing created successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/listings';
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create listing.');
      console.error('Failed to create listing:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a Listing</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <select
          name="listingType"
          value={listingType}
          onChange={handleChange}
        >
          <option value="room">Room</option>
          <option value="food">Food</option>
        </select>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateListingPage;
