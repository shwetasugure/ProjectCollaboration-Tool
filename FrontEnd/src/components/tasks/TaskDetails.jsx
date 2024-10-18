import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './TaskDetail.css';
import Navbar from '../Navbar/Navbar';
import api from '../../api/apiconfig';

const TaskDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {p_id, id} = useParams();
  
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState();

  const [task, setTask] = useState(location.state ? location.state.task : null);
  const fetchTask = async () => {
    const response = await api.get(`/project/${p_id}/task/${id}/`);
    setTask(response.data);
    setUpdatedTask(response.data);
  };

  const [users, setUsers] = useState([]);
  const fetchProject = async () => {
    const response = await api.get(`/project/${p_id}/`);
    setUsers([...response.data.collaborators, response.data.owner]);
  }

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  

  const fetchComments = async () => {
    if (task) {
      const response = await api.get(`/comments/${task.id}/`);
      setComments(response.data);
    }
  };

  const connecttowebsocket = async () => {
    //connect to websocket using access token
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${id}/`);
    ws.onopen = () => {
      console.log('connected to comments websocket');
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('received message:', data);
      if (data.event.type === 'comment_created'){
        setComments((prev) => {
            const existingComment = prev.find(comment => comment.id === data.event.comment.id);
            if (existingComment) return prev;
            return [...prev, data.event.comment];
        });
      }
    };
    ws.onclose = () => {
      console.log('disconnected from websocket');
    };
  }

  const connecttoproject = async () => {
    const ws = new WebSocket(`ws://localhost:8000/ws/project/${p_id}/`);
    ws.onopen = () => {
      console.log('connected to project websocket');
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('received message:', data);
      if (data.type === 'task_updated') {
        setTask(data.task)
      } else if (data.type === 'task_deleted') {
        navigate(`/project/${p_id}`);
      }
    };
    ws.onclose = () => {
      console.log('disconnected from websocket');
    };
  }

  useEffect(() => {
    connecttoproject();
    connecttowebsocket();
    fetchTask();
    fetchProject();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [task]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const response = await api.post(`/comments/${task.id}/`, { text: newComment })
      setComments([...comments, response.data]);
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
    console.log("Saving changes:", updatedTask);
    const response = api.put(`/project/${p_id}/task/${id}/`, updatedTask);
    setTask(response.data);
    setIsEditing(false);
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
          <select
            id="assignto"
            name="assigned_user"
            value={task.assigned_user}
            onChange={handleInputChange}
          >
            <option value="">Assign To</option>
            {
              users.map((collaborator) => (
                <option key={collaborator.id} value={collaborator.id}>
                  {collaborator.username}
                </option>
              ))
            }
          </select>
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
              <option value="todo">TODO</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <div className="task-meta">
            <p><strong>Assigned To:</strong> {task.assigned_user ? task.assigned_user_username : 'None'}</p>
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
          className='textarea'
            placeholder="Add a comment..."
            value={newComment}
            style={{ width: '100%', height: '100px', background:"#3C3B4E" }}
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
