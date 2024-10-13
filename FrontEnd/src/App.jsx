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
function App() {
  return (
    <Router>
      <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Projects" element={<ProjectsPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="/projects/projectDetail" element={<ProjectDetails/>} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
     
    </Router>
  );
}

export default App;

