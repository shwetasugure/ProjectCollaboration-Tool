import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateProject.scss';

const CreateProject = ({ currentProject, onProjectCreated }) => {
  const [project, setProject] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentProject) {
      setProject(currentProject); // Pre-fill form if editing an existing project
    }
  }, [currentProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('authToken'); // Replace with your method of retrieving the token

    try {
      if (currentProject) {
        // Update existing project
        await axios.put(`http://127.0.0.1:8000/api/project/${currentProject.id}/`, project, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the token here
          },
        });
      } else {
        // Create new project
        const response = await axios.post('http://127.0.0.1:8000/api/project/', project, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the token here
          },
        });
        onProjectCreated(response.data); // Notify parent component that project was created
      }

      // Clear form after successful submission
      setProject({ name: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-container">
      <h2>{currentProject ? 'Edit Project' : 'Create New Project'}</h2>
      {error && <p className="error">{error}</p>}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : currentProject ? 'Update Project' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
