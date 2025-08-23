import api from './apiClient';

// Register User
export const registerUser = async (formData) => {
  try {
    const res = await api.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    throw err.response.data.msg;
  }
};

// Login User
export const loginUser = async (formData) => {
  try {
    const res = await api.post('/auth/login', formData);
    return res.data;
  } catch (err) {
    throw err.response.data.msg;
  }
};