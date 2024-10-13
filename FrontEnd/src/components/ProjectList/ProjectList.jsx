import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.scss';

const ProjectList = ({ projects = [], onEdit, onDelete }) => {
  const statusColor = (status) => {
    if (status === 'Completed') return 'status-completed';
    if (status === 'In Progress') return 'status-in-progress';
    return 'status-default';
  };

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
                {project.status}
              </span>
            </div>
            <div className="project-card-actions">
              <Link to={`/projects/projectDetail`} className="action-btn">View Details</Link>
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
