import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './dashboard.css'; // Import external CSS for styling
import {  FaTasks, FaProjectDiagram, FaCheckCircle, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa'; // Icons for the cards


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="summary-cards">
          <div className="card card-comments">
          <FaProjectDiagram className="card-icon" />
            <h3>Total Project </h3>
            <p>26</p>
            
          </div>
          <div className="card card-tasks">
            <FaCheckCircle className="card-icon" />
            <h3>Completed Projects </h3>
            <p>12</p>
            
          </div>
          <div className="card card-orders">
            <FaClipboardList className="card-icon" />
            <h3>Total Tasks</h3>
            <p>124</p>
            
          </div>
          <div className="card card-support">
            <FaExclamationTriangle className="card-icon" />
            <h3>Overdue Tasks</h3>
            <p>13</p>
          
          </div>
        </div>
        <Link to="/projects" className="view-projects-btn">View Projects</Link>
      </div>
    </div>
  );
};

export default Dashboard;
