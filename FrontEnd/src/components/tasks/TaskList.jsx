import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks = [], onMarkComplete, onDelete, onEdit, onAddComment }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onMarkComplete={onMarkComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddComment={onAddComment}  // Passing the comment function
          />
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default React.memo(TaskList);
