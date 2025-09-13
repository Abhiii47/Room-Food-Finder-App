import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

// Add the interceptor to include the token in headers for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Register User
export const registerUser = async (formData) => {
  try {
    const res = await api.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Registration failed';
    throw new Error(message);
  }
};

// Login User
export const loginUser = async (formData) => {
  try {
    const res = await api.post('/auth/login', formData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Login failed';
    throw new Error(message);
  }
};

// Change Password
export const changePassword = async (passwordData) => {
  try {
    const res = await api.put('/auth/change-password', passwordData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to change password';
    throw new Error(message);
  }
};

// Verify Token (check if token is still valid)
export const verifyToken = async () => {
  try {
    const res = await api.get('/auth/verify');
    return res.data;
  } catch (err) {
    // Token is invalid, remove it
    localStorage.removeItem('token');
    const message = err.response?.data?.msg || 'Token verification failed';
    throw new Error(message);
  }
};

// Logout (mainly just removes token from localStorage)
export const logoutUser = () => {
  localStorage.removeItem('token');
  return Promise.resolve({ msg: 'Logged out successfully' });
};

// Request Password Reset (for future implementation)
export const requestPasswordReset = async (email) => {
  try {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to send reset email';
    throw new Error(message);
  }
};

// Reset Password with Token (for future implementation)
export const resetPassword = async (token, newPassword) => {
  try {
    const res = await api.post('/auth/reset-password', { token, newPassword });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to reset password';
    throw new Error(message);
  }
};