import React from 'react';
import '../styles/Form.css'; // Reusing form styles

const ProfilePage = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>My Profile</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-input" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" placeholder="Your Email" readOnly />
          </div>
          <div className="form-group">
            <label>User Type</label>
            <input type="text" className="form-input" placeholder="Student or Vendor" readOnly />
          </div>
          <button type="submit" className="form-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;