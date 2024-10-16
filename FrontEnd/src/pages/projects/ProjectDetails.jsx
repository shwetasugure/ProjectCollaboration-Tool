import React, { useEffect, useState } from 'react';
import CreateTaskForm from '../../components/tasks/CreateTask';
import TaskList from '../../components/tasks/TaskList';
import  KanbanBoard from '../../components/tasks/TaskKanban';
import SearchBar from '../../components/Searchbar/SearchBar';
import Modal from '../../components/Modal/modal';
import api from '../../api/apiconfig';
import './ProjectDetails.scss';
import Navbar from '../../components/Navbar/Navbar'

const ProjectDetails = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); 

  
  const fetchTasks = async () => {
    try {
      const project_id = window.location.pathname.split("/").pop();
      const response = await api.get(`/project/${project_id}/task/`);
      console.log("Fetched Tasks:", response.data); // Log fetched tasks
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  };
  

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/task/${taskId}/`, { status: newStatus });
      fetchTasks(); // Refetch tasks after updating
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 
  const handleAddTask = async (task) => {
    const project_id = window.location.pathname.split("/").pop();
    try {
      const resp = await api.post(`/project/${project_id}/task/`, task);
      setTasks([...tasks, resp.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const handleUpdateTask = async (updatedTask) => {
    try {
      const project_id = window.location.pathname.split("/").pop();
      const resp = await api.put(`/project/${project_id}/task/${updatedTask.id}/`, updatedTask);
      setTasks(tasks.map(task => (task.id === updatedTask.id ? resp.data : task)));
      setEditingTask(null); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  
  const handleDeleteTask = async (taskId) => {
    try {
      const project_id = window.location.pathname.split("/").pop();
      await api.delete(`/project/${project_id}/task/${taskId}/`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  
  const handleMarkComplete = async (taskId) => {
    try {
      const project_id = window.location.pathname.split("/").pop();
      const task = tasks.find(task => task.id === taskId);
      const newStatus = task.status === 'completed' ? 'incomplete' : 'completed'; // Toggle status
      const resp = await api.patch(`/project/${project_id}/task/${taskId}/`, { status: newStatus });
      setTasks(tasks.map(t => (t.id === taskId ? { ...t, ...resp.data } : t)));
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  
  const handleAddComment = async (taskId, comment) => {
    try {
      const project_id = window.location.pathname.split("/").pop();
      const resp = await api.post(`/project/${project_id}/task/${taskId}/comment/`, comment);
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

  return (
    <>
      <Navbar />
      <div className="project-detail-container">
        <h1>Project Details</h1>
        
        {/* Add Task and Search Bar Container */}
        <div className="task-search-container">
        <SearchBar onSearch={handleSearch} />
          <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
            + Add Task
          </button>
          
        </div>
  
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateTaskForm addTask={handleAddTask} />
        </Modal>
  
        {editingTask && (
          <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
            <CreateTaskForm task={editingTask} addTask={handleUpdateTask} />
          </Modal>
        )}
  
        <h2>Task List View</h2>
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDeleteTask}
          onMarkComplete={handleMarkComplete}
          onAddComment={handleAddComment}
        />
        <br />
        <br />
        <br />
        <h2>Kanban View</h2>
        <KanbanBoard tasks={tasks} onUpdateTaskStatus={updateTaskStatus} />
      </div>
    </>
  );
  
};

export default ProjectDetails;
