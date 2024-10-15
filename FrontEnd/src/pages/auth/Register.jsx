// src/components/auth/Register.jsx
import React, { useState } from 'react';
import './Register.scss';
import { registerUser, loginUser } from '../../services/authService'; // Import the API functions
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = { username: name, email, password };
      await registerUser(userData);  // Call the registration API

      // Auto login after successful registration
      const loginResponse = await loginUser({ email, password });
      const user = loginResponse.user;
      const token = loginResponse.token;

      // Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      navigate('/dashboard');  // Redirect to dashboard
    } catch (err) {
      console.error('Registration error:', err);
      // Set error message based on error response
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Registration failed. Please try again.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);  // Reset loading state
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
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;