import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.scss';

const ProjectList = ({ onEdit, onDelete }) => {
  const [projects, setProjects] = useState([]); // State to hold project data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to handle any errors

  useEffect(() => {
    // Fetch projects from the backend
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/project');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data); // Store fetched projects in state
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Handle any error
        setLoading(false); // Stop loading
      }
    };

    fetchProjects(); // Call the function when the component mounts
  }, []); // Empty dependency array to run only on component mount

  const statusColor = (status) => {
    if (status === 'Completed') return 'status-completed';
    if (status === 'In Progress') return 'status-in-progress';
    return 'status-default';
  };

  if (loading) return <div>Loading projects...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state if failed

  return (
    <div className="project-list-container">
      <div className="header">
        <h2>Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-card-header">
              <h3>{project.name}</h3>
              <span className={`status-badge ${statusColor(project.status)}`}>
                {project.status || 'No Status'} {/* Assuming status field might be null */}
              </span>
            </div>
            <div className="project-card-actions">
              <Link to={`/projects/projectDetail/${project.id}`} className="action-btn">View Details</Link>
              <button onClick={() => onEdit(project)} className="action-btn">Edit</button>
              <button onClick={() => onDelete(project.id)} className="action-btn delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
