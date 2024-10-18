import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './TaskKanban.scss';
import { useNavigate, useParams } from 'react-router-dom';

const ItemTypes = {
  TASK: 'task',
};

// Task Card Component
const TaskCard = ({ task }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goToTaskDetail = () => {
    navigate(`/project/${id}/task/${task.id}`);
  };
  const [, ref] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id, status: task.status },
  });

  return (
    <div ref={ref} className="task-card" onClick={goToTaskDetail}>
      <p>{task.title}</p>
    </div>
  );
};

// Column Component for accepting tasks and handling highlight
const Column = ({ status, children, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status); // Change task status when dropped into the column
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`column ${isOver ? 'highlight' : ''}`} // Apply highlight class when hovered
    >
      <h3>{status === 'todo' ? 'To Do' : status === 'in_progress' ? 'In Progress' : 'Done'}</h3>
      {children.length > 0 ? (
        children
      ) : (
        <p className="empty-column">Drop task here</p>
      )}
    </div>
  );
};

// Kanban Board Component
const KanbanBoard = ({tasks, setTasks, handleUpdateTask}) => {

  const moveTask = (taskId, newStatus) => {
    const utask = {...tasks.find((task) => task.id === taskId), status: newStatus};
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? utask : task
    );
    setTasks(updatedTasks);
    handleUpdateTask(utask)
  };

  const taskColumns = {
    todo: tasks.filter((task) => task.status === 'todo'),
    inprogress: tasks.filter((task) => task.status === 'in_progress'),
    done: tasks.filter((task) => task.status === 'completed'),
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        <Column status="todo" moveTask={moveTask}>
          {taskColumns.todo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>
        <Column status="in_progress" moveTask={moveTask}>
          {taskColumns.inprogress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>
        <Column status="completed" moveTask={moveTask}>
          {taskColumns.done.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
