import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

// Dummy WebSocket connection for notifications
const WS_URL = 'ws://localhost:4000/notifications'; // Replace with your WebSocket URL

const Navbar = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setUnreadCount((prevCount) => prevCount + 1); // Increment unread notifications count
    };

    return () => ws.close();
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TaskManager</Link>
      </div>

      {/* Toggle for Mobile Menu */}
      <div className="navbar-toggle" onClick={toggleMobileMenu}>
        <span className="hamburger-icon">&#9776;</span>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/">Dashboard</Link>

        {/* Notification Icon */}
        <div className="navbar-notifications">
          <Link to="/notifications">
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="navbar-profile">
          <i className="fas fa-user-circle"></i>
          <div className="profile-dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;