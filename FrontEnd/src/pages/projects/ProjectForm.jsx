// src/components/projects/ProjectForm.jsx
import React, { useState } from 'react';

const ProjectForm = ({ onSubmit, projectData }) => {
  const [name, setName] = useState(projectData?.name || '');
  const [description, setDescription] = useState(projectData?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <div className="project-form-container">
      <h2>{projectData ? 'Edit Project' : 'Create Project'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Project Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Project Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit">{projectData ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default ProjectForm;
