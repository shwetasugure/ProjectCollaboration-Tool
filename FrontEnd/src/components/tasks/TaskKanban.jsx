import React from 'react';
import TaskCard from './TaskCard';
import './TaskKanban.scss';

const KanbanView = ({ tasks }) => {
  const statusGroups = {
    incomplete: [],
    complete: [],
  };

  tasks.forEach(task => {
    statusGroups[task.status].push(task);
  });

  return (
    <div className="kanban-view">
      <div className="kanban-column">
        <h3>To Do</h3>
        {statusGroups.incomplete.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="kanban-column">
        <h3>Completed</h3>
        {statusGroups.complete.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanView;
