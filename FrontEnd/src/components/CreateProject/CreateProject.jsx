import React, { useState, useEffect } from 'react';
import './CreateProject.scss';

const CreateProject = ({ addProject, currentProject }) => {
  const [project, setProject] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (currentProject) {
      setProject(currentProject);
    }
  }, [currentProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(project);  // Call addProject function passed as prop
    setProject({ name: '', description: '' });
  };

  return (
    <div className="create-project-container">
      <h2>{currentProject ? 'Edit Project' : 'Create New Project'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Project Description:</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">{currentProject ? 'Update Project' : 'Create Project'}</button>
      </form>
    </div>
  );
};

export default CreateProject;
