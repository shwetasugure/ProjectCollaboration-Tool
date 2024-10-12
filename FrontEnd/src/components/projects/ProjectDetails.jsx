// src/components/projects/ProjectDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = {
    id: projectId,
    name: "Project A",
    description: "Detailed description of the project.",
    tasks: [
      { id: 1, title: "Task 1", status: "In Progress" },
      { id: 2, title: "Task 2", status: "Completed" }
    ]
  };

  return (
    <div className="project-details-container">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <h3>Tasks</h3>
      <ul>
        {project.tasks.map(task => (
          <li key={task.id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
