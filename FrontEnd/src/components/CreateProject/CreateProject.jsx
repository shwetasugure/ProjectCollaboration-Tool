import React, { useState, useEffect } from 'react';
import './CreateProject.scss';
import api from '../../api/apiconfig';

const CreateProject = ({ currentProject, addProject }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProject) {
        // Update existing project
        const response = await api.put(`/project/${currentProject.id}/`, project);
        addProject(response.data);
      } else {
        // Create new project
        const response = await api.post('/project/', project);
        addProject(response.data);
      }
    } catch (err) {
      console.error('Error creating project: ', err);
    }
  };

  return (
    <div className="create-project-container">
      <h2>{currentProject ? 'Edit Project' : 'Create New Project'}</h2>
      {/* {error && <p className="error">{error}</p>} */}
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
        {/* <button type="submit" disabled={loading}> */}
        <button type="submit">
          {/* {loading ? 'Saving...' : currentProject ? 'Update Project' : 'Create Project'} */}
          Save Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
