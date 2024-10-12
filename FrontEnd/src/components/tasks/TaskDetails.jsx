// src/components/tasks/TaskDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { taskId } = useParams();
  const task = {
    id: taskId,
    title: "Task A",
    description: "Detailed description of the task.",
    dueDate: "2024-10-20",
    status: "In Progress",
    priority: "High"
  };

  return (
    <div className="task-details-container">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
    </div>
  );
};

export default TaskDetails;
