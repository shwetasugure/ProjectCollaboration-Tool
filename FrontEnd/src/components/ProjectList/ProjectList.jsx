import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.scss';
import api from '../../api/apiconfig';

const ProjectList = ({ onEdit, onDelete, projects }) => {
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State to handle any errors

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
              <h3 >{project.name}</h3>
            </div>
            <div className="project-card-header desc">
              <p>{project.description}</p>
            </div>
            <div className="project-card-header">
              {
                project.collaborators.map(collaborator => {
                  return <span style={{"backgroundColor" : "gray", "padding": "5px", borderRadius: "6px"}} key={collaborator.id} className="collaborator">{collaborator.username}</span>
                })
              }
            </div>
            <div className="project-card-actions">
              <Link to={`/project/${project.id}`} className="action-btn">View Details</Link>
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
