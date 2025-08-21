import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Form.css';
import { loginUser } from '../api/auth';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(formData);
      login(res.token); // Update context and local storage
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err);
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <Link to="/register" className="form-link">
          Don't have an account? Register here.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
