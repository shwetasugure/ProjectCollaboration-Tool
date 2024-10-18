import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoFolderOpenOutline } from "react-icons/io5";
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
            <div className="project-card-header  ">
              
              {
                
                project.collaborators.map(collaborator => {
                  return <span style={{"backgroundColor" : "#2B2C49 ",color:'#9BA9C9', "padding": "5px", borderRadius: "6px" , border:"1px solid #621BD0"}} key={collaborator.id} >{collaborator.username}</span>
                })
              }
            </div>
            <div className="project-card-actions">
              <Link to={`/project/${project.id}`} className="action-btn">View</Link>
              <button onClick={() => onEdit(project)} className="action-btn"><FaRegEdit  style={{height:'15px'}}/></button>
              <button onClick={() => onDelete(project.id)} className="action-btn delete"><AiOutlineDelete style={{height:'15px'}}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
