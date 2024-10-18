import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/auth/Login'
import Navbar from './components/Navbar/Navbar';
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard';
import ProjectDetails from './pages/projects/ProjectDetails'
import ProjectForm from './pages/projects/ProjectForm'
import TaskList from './components/tasks/TaskList'
import TaskDetails from './components/tasks/TaskDetails'
import ProjectsPage from './pages/projects/ProjectsPage';
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard'; // Import the AnalyticsDashboard component
import NotificationPage from './pages/notifications/NotificationPage';
function App() {
  return (
    <Router>
        <Routes>
            <Route path="navbar" element={<Navbar/>} />

            <Route path="/notifications"  element={<NotificationPage />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectsPage />} />

            <Route path="/project/:id" element={<ProjectDetails/>} />
            <Route path="project/:p_id/task/:id" element={<TaskDetails />} />

            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/analytics" component={AnalyticsDashboard} /> // Adjust the route as necessary
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/notifications" component={NotificationPage} />
        </Routes>
    </Router>
  );
}

export default App;

