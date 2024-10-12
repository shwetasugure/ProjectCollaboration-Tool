// src/components/tasks/TaskKanban.jsx
import React from 'react';
import { KanbanComponent } from '@syncfusion/ej2-react-kanban';

const TaskKanban = () => {
  const data = [
    { Id: 1, Status: 'To Do', Title: 'Task A', Description: 'Description for Task A' },
    { Id: 2, Status: 'To Do', Title: 'Task B', Description: 'Description for Task B' },
    { Id: 3, Status: 'In Progress', Title: 'Task C', Description: 'Description for Task C' },
    { Id: 4, Status: 'Done', Title: 'Task D', Description: 'Description for Task D' }
  ];

  const kanbanData = {
    dataSource: data,
    cardSettings: {
      headerField: 'Title',
      contentField: 'Description'
    }
  };

  return (
    <div className="kanban-container">
      <h2>Task Kanban Board</h2>
      <KanbanComponent id="kanban" dataSource={kanbanData} />
    </div>
  );
};

export default TaskKanban;
