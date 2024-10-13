
// src/components/dashboard/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="summary-cards">
        <div className="card">
          <h3>Total Projects</h3>
          <p>5</p>
        </div>
        <div className="card">
          <h3>Total Tasks</h3>
          <p>20</p>
        </div>
        <div className="card">
          <h3>Overdue Tasks</h3>
          <p>2</p>
        </div>
      </div>
      <Link to="/projects">View Projects</Link>
    </div>
    </div>
  );
};

export default Dashboard;
