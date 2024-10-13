import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
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
            <p>New here? <a href="#">Create an account</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
