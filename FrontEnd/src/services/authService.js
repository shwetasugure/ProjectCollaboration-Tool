// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/register';  // Adjust to your backend URL

// Register User API Call
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData);
    return response.data; // Ensure you are returning the data
  } catch (error) {
    console.error('Error in register API call:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Server error'); // Propagate the error
  }
};

// Login User API Call
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, userData);
    return response.data; // Ensure you are returning the data
  } catch (error) {
    console.error('Error in login API call:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Server error');
  }
};
