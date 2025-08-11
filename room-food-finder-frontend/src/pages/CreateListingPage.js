import React from 'react';
import '../styles/Listings.css';

const CreateListingPage = () => {
  return (
    <div className="create-listing-container">
      <div className="form-box">
        <h2>Create a New Listing</h2>
        <form>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Listing Title" required />
          </div>
          <div className="form-group">
            <textarea className="form-input" placeholder="Description" rows="4" required></textarea>
          </div>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Address" required />
          </div>
          <div className="form-group">
            <input type="number" className="form-input" placeholder="Price (e.g., 5000)" required />
          </div>
          <div className="form-group">
            <label>Upload Images:</label>
            <input type="file" multiple />
          </div>
          <button type="submit" className="form-button">Submit Listing</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;