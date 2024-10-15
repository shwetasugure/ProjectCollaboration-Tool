import axios from 'axios';

// Fetch tasks analytics data
export const getTasksAnalytics = async () => {
  try {
    const response = await axios.get('/api/analytics/tasks/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks analytics:', error);
    throw error;
  }
};

// Fetch deadlines analytics data
export const getDeadlinesAnalytics = async () => {
  try {
    const response = await axios.get('/api/analytics/deadlines/');
    return response.data;
  } catch (error) {
    console.error('Error fetching deadlines analytics:', error);
    throw error;
  }
};
