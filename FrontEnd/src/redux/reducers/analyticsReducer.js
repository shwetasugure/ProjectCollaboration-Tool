import {
    FETCH_TASKS_ANALYTICS_SUCCESS,
    FETCH_TASKS_ANALYTICS_FAILURE,
    FETCH_DEADLINES_ANALYTICS_SUCCESS,
    FETCH_DEADLINES_ANALYTICS_FAILURE,
  } from '../actions/analyticsActions';
  
  const initialState = {
    tasksData: [],
    deadlinesData: [],
    error: null,
  };
  
  const analyticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASKS_ANALYTICS_SUCCESS:
        return { ...state, tasksData: action.payload, error: null };
      case FETCH_TASKS_ANALYTICS_FAILURE:
        return { ...state, error: action.payload };
      case FETCH_DEADLINES_ANALYTICS_SUCCESS:
        return { ...state, deadlinesData: action.payload, error: null };
      case FETCH_DEADLINES_ANALYTICS_FAILURE:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default analyticsReducer;
  