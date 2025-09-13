import React, { useState, useContext } from 'react';
import { changePassword } from '../api/auth';
import AuthContext from '../context/AuthContext';
import '../styles/Form.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const { user } = useContext(AuthContext);

  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return false;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return false;
    }

    // Password strength check
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setError('Password should contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await changePassword({
        currentPassword,
        newPassword
      });
      
      setSuccess('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    const checks = [
      password.length >= 6,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
      password.length >= 10
    ];
    
    strength = checks.filter(Boolean).length;
    
    if (strength <= 2) return { strength, label: 'Weak', color: '#dc2626' };
    if (strength <= 4) return { strength, label: 'Medium', color: '#d97706' };
    return { strength, label: 'Strong', color: '#059669' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Change Password</h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '2rem', 
          fontSize: '0.95rem'
        }}>
          Update your account password to keep it secure
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.current ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                className="form-input"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="form-input"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? '🙈' : '👁️'}
              </button>
            </div>
            
            {newPassword && (
              <div className="password-strength">
                <div 
                  className="strength-bar"
                  style={{ 
                    width: `${(passwordStrength.strength / 6) * 100}%`,
                    backgroundColor: passwordStrength.color
                  }}
                ></div>
                <span style={{ color: passwordStrength.color, fontSize: '0.8rem' }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
            
            <small style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              Password must contain at least 6 characters including uppercase, lowercase, and numbers
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? '🙈' : '👁️'}
              </button>
            </div>
            {confirmPassword && newPassword && (
              <small style={{ 
                color: newPassword === confirmPassword ? '#059669' : '#dc2626',
                fontSize: '0.8rem'
              }}>
                {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </small>
            )}
          </div>

          <button 
            type="submit" 
            className={`form-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'var(--secondary-bg)', 
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
            🔒 Password Security Tips
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
            <li>Use a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>Avoid using personal information like birthdays or names</li>
            <li>Don't reuse passwords from other accounts</li>
            <li>Consider using a password manager</li>
            <li>Change your password regularly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;