// src/components/tasks/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ onSubmit, taskData }) => {
  const [title, setTitle] = useState(taskData?.title || '');
  const [description, setDescription] = useState(taskData?.description || '');
  const [dueDate, setDueDate] = useState(taskData?.dueDate || '');
  const [priority, setPriority] = useState(taskData?.priority || 'Normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, priority });
  };

  return (
    <div className="task-form-container">
      <h2>{taskData ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Task Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          required 
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <button type="submit">{taskData ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
