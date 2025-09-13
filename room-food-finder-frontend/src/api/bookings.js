import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
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

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const res = await api.post('/bookings', bookingData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to create booking';
    throw new Error(message);
  }
};

// Get user's bookings (students only)
export const getMyBookings = async () => {
  try {
    const res = await api.get('/bookings/my-bookings');
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Could not fetch your bookings';
    throw new Error(message);
  }
};

// Get bookings for vendor's listings
export const getVendorBookings = async () => {
  try {
    const res = await api.get('/bookings/vendor-bookings');
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Could not fetch bookings for your listings';
    throw new Error(message);
  }
};

// Update booking status (vendors can accept/reject, students can cancel)
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const res = await api.put(`/bookings/${bookingId}/status`, { status });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to update booking status';
    throw new Error(message);
  }
};

// Cancel booking (students only)
export const cancelBooking = async (bookingId) => {
  try {
    const res = await api.put(`/bookings/${bookingId}/cancel`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Failed to cancel booking';
    throw new Error(message);
  }
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const res = await api.get(`/bookings/${bookingId}`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.msg || 'Could not fetch booking details';
    throw new Error(message);
  }
};