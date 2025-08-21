import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// This part is crucial: It automatically attaches the token to every API call.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getListings = async () => {
  try {
    const res = await api.get('/listings');
    return res.data;
  } catch (err) {
    throw err.response.data.msg || 'Could not fetch listings';
  }
};

export const getListingById = async (id) => {
  try {
    const res = await api.get(`/listings/${id}`);
    return res.data;
  } catch (err) {
    throw err.response.data.msg || 'Could not fetch listing details';
  }
};

export const createListing = async (formData) => {
  try {
    const res = await api.post('/listings', formData);
    return res.data;
  } catch (err) {
    throw err.response.data.msg || 'Failed to create listing';
  }
};

export const updateListing = async (id, formData) => {
  try {
    const res = await api.put(`/listings/${id}`, formData);
    return res.data;
  } catch (err) {
    throw err.response.data.msg || 'Failed to update listing';
  }
};

export const getMyListings = async () => {
  try {
    const res = await api.get('/listings/my-listings');
    return res.data;
  } catch (err) {
    console.error("API Error fetching my listings:", err.response);
    throw err.response.data.msg || 'Could not fetch your listings';
  }
};

export const deleteListing = async (id) => {
  try {
    const res = await api.delete(`/listings/${id}`);
    return res.data;
  } catch (err) {
    console.error("API Error deleting listing:", err.response);
    throw err.response.data.msg || 'Failed to delete listing';
  }
};

