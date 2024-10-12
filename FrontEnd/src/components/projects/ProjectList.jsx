// src/components/projects/ProjectList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const projects = [
    { id: 1, name: "Project A", status: "In Progress" },
    { id: 2, name: "Project B", status: "Completed" },
    // More projects...
  ];

  return (
    <div className="project-list-container">
      <h2>Projects</h2>
      <button><Link to="/projects/new">Add Project</Link></button>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>
                <Link to={`/projects/${project.id}`}>View</Link>
                <Link to={`/projects/edit/${project.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
