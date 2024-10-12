// src/redux/reducers/projectReducer.js
const initialState = {
    projects: [],
  };
  
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_PROJECT':
        return {
          ...state,
          projects: [...state.projects, action.payload],
        };
      case 'DELETE_PROJECT':
        return {
          ...state,
          projects: state.projects.filter(p => p.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default projectReducer;
  