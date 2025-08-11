import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Form.css';

const LoginPage = () => {
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        <form>
          {/* ... form fields ... */}
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        {/* You can add a temporary link to the dashboard here to test */}
        <Link to="/dashboard" className="form-link">Go to Dashboard (for testing)</Link>
        
        <Link to="/register" className="form-link">
          Don't have an account? Register here.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;