import React, { useState } from 'react';
import CreateTaskForm from '../../components/tasks/CreateTask';
import TaskList from '../../components/tasks/TaskList';
import KanbanView from '../../components/tasks/TaskKanban';
import SearchBar from '../../components/Searchbar/SearchBar';
import Modal from '../../components/Modal/modal'; // Import the Modal component
import './ProjectDetails.scss';

const ProjectDetails = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1, status: 'incomplete' }]);
    setIsModalOpen(false); // Close modal after adding task
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="project-detail-container">
      <h1>Project Details</h1>

      {/* Button to open the task creation modal */}
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        + Add Task
      </button>

      {/* Modal for Task Creation */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateTaskForm addTask={handleAddTask} />
      </Modal>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />
      
      <h2>Task List View</h2>
      <TaskList tasks={filteredTasks} />

      <h2>Kanban View</h2>
      <KanbanView tasks={filteredTasks} />
    </div>
  );
};

export default ProjectDetails;
