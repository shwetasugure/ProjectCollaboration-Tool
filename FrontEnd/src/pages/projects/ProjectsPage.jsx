import React, { useState } from 'react';
import CreateProject from '../../components/CreateProject/CreateProject';
import ProjectList from '../../components/ProjectList/ProjectList';
import Modal from '../../components/Modal/modal'
// import './ProjectsPage.scss';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", status: "In Progress", description: "This is project A" },
    { id: 2, name: "Project B", status: "Completed", description: "This is project B" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // For editing a project

  const addProject = (newProject) => {
    if (currentProject) {
      // Editing existing project
      setProjects(projects.map(project => (project.id === currentProject.id ? newProject : project)));
      setCurrentProject(null);
    } else {
      // Adding new project
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    }
    setIsModalOpen(false); // Close modal after action
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
    setProjects(projects.filter(project => project.id !== projectId));
  };

  return (
    <div className="project-dashboard">
      <button className="add-project-btn" onClick={openModal}>
        + Add Project
      </button>

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
  );
};

export default ProjectsPage;
