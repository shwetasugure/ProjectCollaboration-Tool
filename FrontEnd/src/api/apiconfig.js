import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


const getAccessToken = () => {
  return localStorage.getItem('access'); 
};

// Function to get refresh token
const getRefreshToken = () => {
  return localStorage.getItem('refresh'); 
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to unauthorized access (401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        // Make a request to refresh the access token
        const refreshToken = getRefreshToken();
        const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
        
        const newAccessToken = response.data.access; // Adjust based on your token structure
        localStorage.setItem('token', JSON.stringify({"access": newAccessToken, "refresh": refreshToken}));

        // Set the new token to the original request and retry
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
