// src/components/auth/Register.jsx
import React, { useState } from 'react';
import './Register.scss';
import { registerUser, loginUser } from '../../services/authService'; // Import the API functions
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      await api.post("/register/", { "username": name, email, password });
      console.log("Registration successful!");
      const loginResponse = await api.post("/token/", { "username": name, password });
      const data = await loginResponse;
      localStorage.setItem("access", data.data.access);
      localStorage.setItem("refresh", data.data.refresh);
      console.log("Logged in successfully!");
      navigate('/');
    } catch (error) {
      alert(JSON.stringify(error.response?.data));
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="redirect">
          Already have an account? <a href="Login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;