import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  // Fetch the data from APIs
  useEffect(() => {
    // Fetch tasks completed per team member
    api.get('/analytics/team-tasks-completed/')
      .then(response => setTasksCompleted(response.data))
      .catch(error => console.error('Error fetching completed tasks:', error));

    // Fetch average time to complete tasks
    api.get('/analytics/average-time-to-complete/')
      .then(response => setAverageTime(response.data.average_time))
      .catch(error => console.error('Error fetching average time:', error));

    // Fetch upcoming tasks
    api.get('/analytics/upcoming-tasks/')
      .then(response => setUpcomingTasks(response.data))
      .catch(error => console.error('Error fetching upcoming tasks:', error));

    // Fetch overdue tasks
    api.get('/analytics/overdue-tasks/')
      .then(response => setOverdueTasks(response.data))
      .catch(error => console.error('Error fetching overdue tasks:', error));
  }, []);

  // Prepare data for the bar chart
  const usernames = tasksCompleted.map(item => item.assigned_user__username);
  const taskCounts = tasksCompleted.map(item => item.completedTasks);

  const data = {
    labels: usernames,
    datasets: [
      {
        label: 'Tasks Completed',
        data: taskCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Tasks Completed Per Team Member',
      },
    },
  };

  return (
    <div className="analytics-dashboard">
      
     
      <div className="" style={{display:"flex"}}>
        <div className='card' style={{margin: "10px"}}>
          <h3>Tasks Completed Per Team Member</h3>
          {tasksCompleted.length > 0 ? (
            <Bar data={data} options={options} />
          ) : (
            <p>No tasks completed yet.</p>
          )}
        </div>
         {/* List View for Upcoming Tasks */}
      <div className="" style={{display:'flex', justifyContent: 'space-evenly'}}>
        <div className="card" style={{margin: "10px"}}>
          <h3 style={{textAlign: 'left'}}>Upcoming Tasks</h3>
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


      {/* List View for Overdue Tasks */}
      <div className="card" style={{margin: "10px"}}>
      <h3 style={{textAlign: 'left'}} >Overdue Tasks</h3>
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
      </div>

        {/* Small and Shorter Average Time Card */}
        <div className="card" style={{margin: "10px"}}>
          <h3>Avg Time to Complete</h3>
          <p>{averageTime} days</p>
        </div>
      </div>


    </div>
  );
};

export default AnalyticsDashboard;
