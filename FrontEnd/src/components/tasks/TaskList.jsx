import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks = [], project_id, onMarkComplete, onDelete, onEdit, onAddComment }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskCard
            project_id={project_id}
            key={task.id}
            task={task}
            onMarkComplete={onMarkComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddComment={onAddComment}
          />
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default React.memo(TaskList);
