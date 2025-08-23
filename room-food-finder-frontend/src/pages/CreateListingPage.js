import React, { useState, useContext } from 'react';
import { createListing } from '../api/listings'; // The unused import
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
      // **FIX:** Call the createListing function here
      await createListing(formData);

      setSuccess('Listing created successfully! Redirecting...');
      
      setTimeout(() => {
        window.location.href = '/listings';
      }, 1500);
    } catch (err) {
      setError(err);
      console.error('Failed to create listing:', err);
    }
  };

  return (
    <div className="form-container">
      {/* ... rest of your JSX code ... */}
    </div>
  );
};

export default CreateListingPage;