import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TaskDetail.css';
import Navbar from '../Navbar/Navbar';

const TaskDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(location.state ? location.state.task : null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  // New states to handle task editing
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task || {});

  useEffect(() => {
    if (task) {
      // Dummy comments or fetch from backend
      const commentsData = [
        { id: 1, author: 'Alice', text: 'Don’t forget to add token expiration.' },
        { id: 2, author: 'Bob', text: 'We should also add password reset functionality.' },
      ];
      setComments(commentsData);
    }
  }, [task]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        author: 'Current User', // Replace with the logged-in user
        text: newComment,
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  // Enable editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle task input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  // Save the updated task and disable editing mode
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setTask(updatedTask); // Save changes to task (or send to backend)
    setIsEditing(false);

    // Optional: If you have a backend, make an API call here to update the task.
    // Example: updateTaskAPI(updatedTask)
  };

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <><Navbar/>
    <div className="task-detail-container">
      <div className="task-header">
        {isEditing ? (
          <form onSubmit={handleSaveChanges} className="edit-task-form">
            <input
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
            />
            <textarea
              name="description"
              value={updatedTask.description}
              onChange={handleInputChange}
              placeholder="Task Description"
            />
            <input
              type="text"
              name="assigned_to"
              value={updatedTask.assigned_to}
              onChange={handleInputChange}
              placeholder="Assigned To"
            />
            <input
              type="date"
              name="due_date"
              value={updatedTask.due_date}
              onChange={handleInputChange}
            />
            <select
              name="priority"
              value={updatedTask.priority}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              name="status"
              value={updatedTask.status}
              onChange={handleInputChange}
            >
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <div className="task-meta">
            <p><strong>Collaborator:</strong> {task.collaborator ? task.collaborator.name : 'None'}</p>
            <p><strong>Owner:</strong> {task.owner ? task.owner.name : 'None'}</p>
              <p><strong>Due Date:</strong> {task.due_date}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </div>
            <button onClick={handleEditClick}>Edit Task</button>
          </>
        )}
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <strong>{comment.author}:</strong> <span>{comment.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment} className="add-comment-form">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default TaskDetails;
