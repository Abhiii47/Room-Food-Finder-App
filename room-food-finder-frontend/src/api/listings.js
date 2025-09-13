import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getListings = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type', filters.type);
    if (filters.city) params.append('city', filters.city);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.page) params.append('page', filters.page);

    const queryString = params.toString();
    const url = queryString ? `/listings?${queryString}` : '/listings';
    
    const res = await api.get(url);
    return res.data.listings || res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Could not fetch listings';
    throw new Error(message);
  }
};

export const getListingById = async (id) => {
  try {
    const res = await api.get(`/listings/${id}`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Could not fetch listing details';
    throw new Error(message);
  }
};

export const createListing = async (formData) => {
  try {
    const res = await api.post('/listings', formData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to create listing';
    throw new Error(message);
  }
};

export const updateListing = async (id, formData) => {
  try {
    const res = await api.put(`/listings/${id}`, formData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to update listing';
    throw new Error(message);
  }
};

export const getMyListings = async () => {
  try {
    const res = await api.get('/listings/my-listings');
    return res.data;
  } catch (err) {
    console.error("API Error fetching my listings:", err.response);
    const message = err.response?.data?.msg || 'Could not fetch your listings';
    throw new Error(message);
  }
};

export const deleteListing = async (id) => {
  try {
    const res = await api.delete(`/listings/${id}`);
    return res.data;
  } catch (err) {
    console.error("API Error deleting listing:", err.response);
    const message = err.response?.data?.msg || 'Failed to delete listing';
    throw new Error(message);
  }
};

// Search listings with location
export const searchListingsNearby = async (latitude, longitude, radius = 10) => {
  try {
    const res = await api.get(`/listings/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Could not fetch nearby listings';
    throw new Error(message);
  }
};

