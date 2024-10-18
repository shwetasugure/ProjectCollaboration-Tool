import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './dashboard.css'; // Import external CSS for styling
import {  FaTasks, FaProjectDiagram, FaCheckCircle, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa'; // Icons for the cards
import TaskAnalyticsDashboard from '../analytics/AnalyticsDashboard';


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard - Project Management';
    if (localStorage.getItem('access') === null)
      navigate('/login');
  }, []);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <TaskAnalyticsDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
