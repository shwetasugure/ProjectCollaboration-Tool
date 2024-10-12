import React, { useState } from 'react';
import './CreateTask.scss'; // Make sure to include the updated styles

const CreateTaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    due_date: '',
    priority: 'medium',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({ title: '', description: '', assigned_to: '', due_date: '', priority: 'medium' });
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h3>Create New Task</h3>
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder=" "
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Task Description</label>
        <textarea
          id="description"
          name="description"
          placeholder=" "
          value={task.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="assigned_to">Assign to</label>
        <input
          type="text"
          id="assigned_to"
          name="assigned_to"
          placeholder=" "
          value={task.assigned_to}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="due_date">Due Date</label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select id="priority" name="priority" value={task.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="add-task-btn">Add Task</button>
    </form>
  );
};

export default CreateTaskForm;
