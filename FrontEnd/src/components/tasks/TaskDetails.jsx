import React, { useState, useEffect } from 'react';
// import './TaskDetails.scss';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Dummy data for the task
    const taskData = {
      id: 1,
      title: 'Implement Authentication',
      description: 'Set up user authentication using JWT for the project.',
      assigned_to: 'John Doe',
      due_date: '2024-10-20',
      priority: 'high',
      status: 'incomplete',
    };

    const commentsData = [
      { id: 1, author: 'Alice', text: 'Don’t forget to add token expiration.' },
      { id: 2, author: 'Bob', text: 'We should also add password reset functionality.' },
    ];

    setTask(taskData);
    setComments(commentsData);
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        author: 'Current User', // Replace with the current logged-in user
        text: newComment,
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <div className="task-detail-container">
      <div className="task-header">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <div className="task-meta">
          <p><strong>Assigned To:</strong> {task.assigned_to}</p>
          <p><strong>Due Date:</strong> {task.due_date}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>
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
  );
};

export default TaskDetails;
