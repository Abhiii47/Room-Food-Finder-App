import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Add the interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const getProfile = async () => {
  try {
    const res = await api.get('/users/me');
    return res.data;
  } catch (err) {
    throw err.response.data.msg || 'Could not fetch profile';
  }
};

export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    // Return a default object if user is not found, to prevent crashes
    return { name: 'Unknown User' };
  }
};