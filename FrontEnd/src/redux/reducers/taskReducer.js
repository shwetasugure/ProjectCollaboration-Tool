// src/redux/reducers/taskReducer.js
const initialState = {
    tasks: [],
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_TASK':
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case 'UPDATE_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task => 
            task.id === action.payload.id ? action.payload : task
          ),
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  