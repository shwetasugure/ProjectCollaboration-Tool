import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.scss';
import api from '../../api/apiconfig';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsDashboard = () => {
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [averageTime, setAverageTime] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  useEffect(() => {
    api.get('/analytics/team-tasks-completed/')
      .then(response => setTasksCompleted(response.data))
      .catch(error => console.error('Error fetching completed tasks:', error));

    api.get('/analytics/average-time-to-complete/')
      .then(response => setAverageTime(response.data.average_time))
      .catch(error => console.error('Error fetching average time:', error));

    api.get('/analytics/upcoming-tasks/')
      .then(response => setUpcomingTasks(response.data))
      .catch(error => console.error('Error fetching upcoming tasks:', error));

    api.get('/analytics/overdue-tasks/')
      .then(response => setOverdueTasks(response.data))
      .catch(error => console.error('Error fetching overdue tasks:', error));
  }, []);

  const usernames = tasksCompleted.map(item => item.assigned_user__username);
  const taskCounts = tasksCompleted.map(item => item.completedTasks);

  const data = {
    labels: usernames,
    datasets: [
      {
        label: 'Tasks Completed',
        data: taskCounts,
        backgroundColor: 'rgba(65, 105, 225, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,  // Chart will maintain its aspect ratio
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Tasks Completed Per Team Member' },
    },
  };

  return (
    <div className="analytics-dashboard">
      {/* First Row with one card */}
      <div className="row">
        <div className="card" style={{ margin: "40px", width: "700px", height: "400px", padding: "20px" }}>
          <h3>Tasks Completed</h3>
          {tasksCompleted.length > 0 ? (
            <div style={{ height: '200px' }}>
              <Bar data={data} options={options} />
            </div>
          ) : (
            <p>No tasks completed yet.</p>
          )}
        </div>
      </div>

      {/* Second Row with three cards */}
      <div className="row">
        {/* Avg Time Card */}
        <div className="card" style={{ margin: "10px" }}>
          <h3>Avg Time to Complete</h3>
          <p>{averageTime} days</p>
        </div>

        {/* Overdue Tasks */}
        <div className="card" style={{ margin: "10px" }}>
          <h3 style={{ textAlign: 'left' }}>Overdue Tasks</h3>
          {overdueTasks.length > 0 ? (
            <ol>
              {overdueTasks.map((task, index) => (
                <li key={index}>
                  <strong>{task.title}</strong> - Assigned to: {task.assigned_user__username}, Overdue since: {task.due_date}
                </li>
              ))}
            </ol>
          ) : (
            <p>No overdue tasks.</p>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="card" style={{ margin: "10px" }}>
          <h3 style={{ textAlign: 'left' }}>Upcoming Tasks</h3>
          {upcomingTasks.length > 0 ? (
            <ol>
              {upcomingTasks.map((task, index) => (
                <li key={index}>
                  <strong>{task.title}</strong> - Assigned to: {task.assigned_user__username}, Due by: {task.due_date}
                </li>
              ))}
            </ol>
          ) : (
            <p>No upcoming tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
