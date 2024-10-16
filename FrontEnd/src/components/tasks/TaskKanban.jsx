import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './TaskKanban.scss';

const ItemTypes = {
  TASK: 'task',
};

// Task Card Component
const TaskCard = ({ task, index, moveTask }) => {
  const [, ref] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, index }, // Includes index for drag and drop
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item) {
      if (item.index !== index) {
        moveTask(item.index, index); // Move task to new index
        item.index = index; // Update dragged item's index
      }
    },
  });

  return (
    <div ref={node => ref(drop(node))} className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};

// Kanban Board Component
const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'incomplete' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'incomplete' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'completed' },
    { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'completed' },
  ]);

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1); // Remove task from original position
    updatedTasks.splice(toIndex, 0, movedTask); // Insert task at new position

    // Update the status based on the new position after drop
    const newStatus = toIndex < tasks.length / 2 ? 'incomplete' : 'completed'; // Assuming two columns
    movedTask.status = newStatus;

    setTasks(updatedTasks); // Update the state
  };

  const incompleteTasks = tasks.filter(task => task.status === 'incomplete');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        
      <div className="column">
          <h3>All Tasks</h3>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              moveTask={moveTask}
            />
          ))}
        </div>

        <div className="column">
          <h3>Incomplete Tasks</h3>
          {incompleteTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} moveTask={moveTask} />
          ))}
        </div>

      
        <div className="column">
          <h3>Completed Tasks</h3>
          {completedTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index + incompleteTasks.length}
              moveTask={moveTask}
            />
          ))}
        </div>

       
        
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
