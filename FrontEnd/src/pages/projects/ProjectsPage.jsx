import React, { useState, useEffect } from 'react';
import CreateProject from '../../components/CreateProject/CreateProject';
import ProjectList from '../../components/ProjectList/ProjectList';
import Modal from '../../components/Modal/modal';
import Navbar from '../../components/Navbar/Navbar'; // Import the Navbar

import api from '../../api/apiconfig';

import './ProjectsPage.scss'; // Import the updated styles


const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);


  const fetchProjects = async () => {
    try {
      const response = await api.get('/project');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects: ', error);
    }
  };

  const addProject = (newProject) => {
    if (currentProject) {
      setProjects(projects.map(project => (project.id === currentProject.id ? newProject : project)));
      setCurrentProject(null);
    } else {
      setProjects([...projects, newProject ]);
    }
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const editProject = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const deleteProject = (projectId) => {
    api.delete(`/project/${projectId}/`);
    setProjects(projects.filter(project => project.id !== projectId));
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
    <Navbar />
    
    <div className="project-dashboard">
       

      <div className="header-container">
        <h1>Projects</h1>
        <button className="add-project-btn" onClick={openModal}>
          + Add Project
        </button>
      </div>

      <ProjectList
        projects={projects}
        onEdit={editProject}
        onDelete={deleteProject}
      />

      {/* Modal for create/edit project */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateProject
            addProject={addProject}
            currentProject={currentProject}
          />
        </Modal>
      )}
    </div>
    </>
  );
};

export default ProjectsPage;
