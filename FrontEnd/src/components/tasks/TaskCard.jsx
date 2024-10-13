import React from 'react';
import './TaskCard.scss';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Assigned to:</strong> {task.assigned_to}</p>
      <p><strong>Due date:</strong> {task.due_date}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <button onClick={() => console.log(`Marking task ${task.id} as complete/incomplete`)}>Toggle Complete</button>
      <button onClick={() => console.log(`Deleting task ${task.id}`)}>Delete Task</button>
    </div>
  );
};

export default TaskCard;
