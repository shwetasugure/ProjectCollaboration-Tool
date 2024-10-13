import axios from 'axios';

// Action Types
export const FETCH_TASKS_ANALYTICS_SUCCESS = 'FETCH_TASKS_ANALYTICS_SUCCESS';
export const FETCH_TASKS_ANALYTICS_FAILURE = 'FETCH_TASKS_ANALYTICS_FAILURE';
export const FETCH_DEADLINES_ANALYTICS_SUCCESS = 'FETCH_DEADLINES_ANALYTICS_SUCCESS';
export const FETCH_DEADLINES_ANALYTICS_FAILURE = 'FETCH_DEADLINES_ANALYTICS_FAILURE';

// Action Creators for Task Analytics
export const fetchTasksAnalyticsSuccess = (data) => ({
  type: FETCH_TASKS_ANALYTICS_SUCCESS,
  payload: data,
});

export const fetchTasksAnalyticsFailure = (error) => ({
  type: FETCH_TASKS_ANALYTICS_FAILURE,
  payload: error,
});

// Action Creators for Deadlines Analytics
export const fetchDeadlinesAnalyticsSuccess = (data) => ({
  type: FETCH_DEADLINES_ANALYTICS_SUCCESS,
  payload: data,
});

export const fetchDeadlinesAnalyticsFailure = (error) => ({
  type: FETCH_DEADLINES_ANALYTICS_FAILURE,
  payload: error,
});

// Async Actions for Fetching Tasks and Deadlines Analytics Data
export const fetchTasksAnalytics = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/analytics/tasks/');
    dispatch(fetchTasksAnalyticsSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksAnalyticsFailure(error.message));
  }
};

export const fetchDeadlinesAnalytics = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/analytics/deadlines/');
    dispatch(fetchDeadlinesAnalyticsSuccess(response.data));
  } catch (error) {
    dispatch(fetchDeadlinesAnalyticsFailure(error.message));
  }
};
