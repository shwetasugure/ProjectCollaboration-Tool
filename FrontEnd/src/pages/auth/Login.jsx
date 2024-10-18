import React, { useEffect, useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('token/', { username, password });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      console.log("logged in")
      
      navigate('/'); 
    } catch (error) {
      alert(error.response.data);
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="fancy-input"
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="fancy-input"
            />
          </div>
          <button type="submit" className="fancy-button">Login</button>
          <div className="extra-links">
            <a href="#">Forgot Password?</a>
            <p>New here? <a href="Register">Create an account</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
