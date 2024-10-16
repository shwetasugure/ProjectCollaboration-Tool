import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskCard.scss';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const goToTaskDetail = () => {
    navigate(`/task/${task.id}`, { state: { task } }); // Passing task data using state
  };

  return (
    <div className="task-card" onClick={goToTaskDetail}>
      <h3>{task.title}</h3>
      <h4>{task.description}</h4>
      <p><strong>Asign to:</strong> {task.collaborator ? task.collaborator.name : 'None'}</p>
      
      <p><strong>Due date:</strong> {task.due_date}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <button onClick={(e) => { e.stopPropagation(); console.log(`Marking task ${task.id} as complete/incomplete`)}}>Toggle Complete</button>
      <button onClick={(e) => { e.stopPropagation(); console.log(`Deleting task ${task.id}`)}}>Delete Task</button>
    </div>
  );
};

export default TaskCard;
