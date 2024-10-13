import React, { useState } from 'react';
import './ProjectForm.scss'; // Add your own styles

const ProjectForm = ({ onSubmit, projectData }) => {
  const [name, setName] = useState(projectData?.name || '');
  const [description, setDescription] = useState(projectData?.description || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError('Project name is required.');
      return;
    }
    setError('');
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
          aria-label="Project Name"
        />
        <textarea 
          placeholder="Project Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          aria-label="Project Description"
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-btn">
          {projectData ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
