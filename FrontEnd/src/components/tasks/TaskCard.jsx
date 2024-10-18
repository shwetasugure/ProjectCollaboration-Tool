import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskCard.scss';

const TaskCard = ({ project_id, task, onMarkComplete, onDelete, onEdit, onAddComment}) => {
  const navigate = useNavigate();

  const goToTaskDetail = () => {
    navigate(`/project/${project_id}/task/${task.id}`);
  };

  return (
    <div className="task-cards cards">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Assigned to:</strong> {task.assigned_user_username ? task.assigned_user_username : "None"}</p>
      <p><strong>Due date:</strong> {task.due_date}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      {/* <button onClick={onMarkComplete}>Toggle Complete</button> */}
      <button onClick={() => {onDelete(task.id)}}>Delete Task</button>
      <button onClick={goToTaskDetail}>Open</button>
    </div>
  );
};

export default TaskCard;
