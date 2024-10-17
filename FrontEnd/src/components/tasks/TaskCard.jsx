import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskCard.scss';

const TaskCard = ({ project_id, task, onMarkComplete, onDelete, onEdit, onAddComment}) => {
  const navigate = useNavigate();

  const goToTaskDetail = () => {
    navigate(`/project/${project_id}/task/${task.id}`);
  };

  return (
<<<<<<< HEAD
    <div className="task-card" onClick={goToTaskDetail}>
      <h3>{task.title}</h3>
      <h4>{task.description}</h4>
      <p><strong>Asign to:</strong> {task.collaborator ? task.collaborator.name : 'None'}</p>
      
=======
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Collaborator:</strong> {task.collaborator ? task.collaborator.name : 'None'}</p>
      <p><strong>Owner:</strong> {task.owner ? task.owner.name : 'None'}</p>
>>>>>>> 06ec2bf9d99bb2ff25c6e3b8d516a700b2a87a81
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
