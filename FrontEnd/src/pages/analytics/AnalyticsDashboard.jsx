import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksAnalytics, fetchDeadlinesAnalytics } from '../../actions/analyticsActions';

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();

  // Fetching data from Redux state
  const tasksData = useSelector((state) => state.analytics.tasksData);
  const deadlinesData = useSelector((state) => state.analytics.deadlinesData);
  const error = useSelector((state) => state.analytics.error);

  // Fetch tasks and deadlines analytics on component mount
  useEffect(() => {
    dispatch(fetchTasksAnalytics());
    dispatch(fetchDeadlinesAnalytics());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>
      
      {/* Display Task Analytics */}
      <section>
        <h2>Tasks Analytics</h2>
        {tasksData.length === 0 ? (
          <p>Loading tasks data...</p>
        ) : (
          <ul>
            {tasksData.map((task, index) => (
              <li key={index}>{task.name} - {task.timeSpent} hours</li>
            ))}
          </ul>
        )}
      </section>

      {/* Display Deadlines Analytics */}
      <section>
        <h2>Deadlines Analytics</h2>
        {deadlinesData.length === 0 ? (
          <p>Loading deadlines data...</p>
        ) : (
          <ul>
            {deadlinesData.map((deadline, index) => (
              <li key={index}>{deadline.name} - {deadline.status}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
