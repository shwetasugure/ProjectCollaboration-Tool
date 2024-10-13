import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './dashboard.css'; // Import external CSS for styling

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="summary-cards">
          <div className="card card-projects">
            <h3>Total Projects</h3>
            <p>5</p>
            <small>Jan - March 2024</small>
          </div>
          <div className="card card-tasks">
            <h3>Total Tasks</h3>
            <p>20</p>
            <small>Jan - March 2024</small>
          </div>
          <div className="card card-overdue">
            <h3>Overdue Tasks</h3>
            <p>2</p>
            <small>Jan - March 2024</small>
          </div>
        </div>
        <Link to="/projects" className="view-projects-btn">View Projects</Link>
      </div>
    </div>
  );
};

export default Dashboard;
