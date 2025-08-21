import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById, updateListing } from '../api/listings';
import AuthContext from '../context/AuthContext';
import '../styles/Form.css';

const EditListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    listingType: 'room',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        // Ensure the logged-in user is the owner of the listing
        if (user && data.vendor._id === user.id) {
          setFormData({
            title: data.title,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl || '',
            listingType: data.listingType,
          });
        } else {
          setError('You are not authorized to edit this listing.');
        }
      } catch (err) {
        setError('Failed to fetch listing details.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchListing();
    }
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await updateListing(id, formData);
      setSuccess('Listing updated successfully! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard/my-listings');
      }, 1500);
    } catch (err) {
      setError('Failed to update listing. Please try again.');
    }
  };

  if (loading) return <p>Loading editor...</p>;

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Edit Listing</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        {!error && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-input" placeholder="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <textarea className="form-input" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="number" className="form-input" placeholder="Price" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" className="form-input" placeholder="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
            </div>
            <div className="form-group">
              <select className="form-input" name="listingType" value={formData.listingType} onChange={handleChange}>
                <option value="room">Room</option>
                <option value="food">Food</option>
              </select>
            </div>
            <button type="submit" className="form-button">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditListingPage;