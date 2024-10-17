import React, { useEffect, useState } from 'react';
import CreateTaskForm from '../../components/tasks/CreateTask';
import TaskList from '../../components/tasks/TaskList';
import  KanbanBoard from '../../components/tasks/TaskKanban';
import SearchBar from '../../components/Searchbar/SearchBar';
import Modal from '../../components/Modal/modal';
import api from '../../api/apiconfig';
import './ProjectDetails.scss';
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); 
  const {id} = useParams();


  const fetchTasks = async () => {
    try {
      const response = await api.get(`/project/${id}/task/`);
      // console.log("Fetched Tasks:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  };


  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/task/${taskId}/`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };




  const handleAddTask = async (task) => {
    try {
      const resp = await api.post(`/project/${id}/task/`, task);
      setTasks([...tasks, resp.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const handleUpdateTask = async (updatedTask) => {
    try {
      const resp = await api.put(`/project/${id}/task/${updatedTask.id}/`, updatedTask);
      setTasks(tasks.map(task => (task.id === updatedTask.id ? resp.data : task)));
      setEditingTask(null); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  
  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/project/${id}/task/${taskId}/`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  
  const handleMarkComplete = async (taskId) => {
    try {
      const task = tasks.find(task => task.id === taskId);
      const newStatus = task.status === 'completed' ? 'incomplete' : 'completed'; // Toggle status
      task.status = newStatus;
      handleUpdateTask(task);
      setTasks(tasks.map(t => (t.id === taskId ? { ...t, ...resp.data } : t)));
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  
  const handleAddComment = async (taskId, comment) => {
    try {
      const resp = await api.post(`/project/${id}/task/${taskId}/comment/`, comment);
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, comments: [...task.comments, resp.data] } : task)));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

 
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredTasks = tasks.filter(task =>
    task && task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const connecttowebsocket = async () => {
    const ws = new WebSocket(`ws://localhost:8000/ws/project/${id}/`);
    ws.onopen = () => {
      console.log('connected to websocket');
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('received message:', data);
      if (data.type === 'task_created') {
        setTasks((prev) => {
          const existingTask = prev.find(task => task.id === data.task.id);
          if (existingTask) return prev;
          return [...prev, data.task];
        });
      } else if (data.type === 'task_updated') {
        setTasks((prev) => {
          const existingTask = prev.find(task => task.id === data.task.id);
          if (!existingTask) return prev;
          return prev.map(task => (task.id === data.task.id ? data.task : task));
        })
      } else if (data.type === 'task_deleted') {
        setTasks((prev) => prev.filter(task => task.id !== data.task.id));
      }
    };
    ws.onclose = () => {
      console.log('disconnected from websocket');
    };
  }

  useEffect(() => {
    fetchTasks();
    connecttowebsocket();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="project-detail-container">
      <h1>Project Details</h1>

    
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        + Add Task
      </button>

    
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateTaskForm addTask={handleAddTask} />
      </Modal>

     
      {editingTask && (
        <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
          <CreateTaskForm task={editingTask} addTask={handleUpdateTask} />
        </Modal>
      )}

   
      <SearchBar onSearch={handleSearch} />

      <h2>Task List View</h2>
      <TaskList
        tasks={filteredTasks}
        project_id={window.location.pathname.split("/").pop()}
        onEdit={(task) => setEditingTask(task)} 
        onDelete={handleDeleteTask}
        onMarkComplete={handleMarkComplete}
        onAddComment={handleAddComment}
      />

      <h2>Kanban View</h2>
      <KanbanBoard tasks={tasks} onUpdateTaskStatus={updateTaskStatus} />
    </div>
    </>
  );
};

export default ProjectDetails;
