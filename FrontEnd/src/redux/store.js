// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import projectReducer from './reducers/projectReducer';
import taskReducer from './reducers/taskReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  tasks: taskReducer,
  notifications: notificationReducer,
});

const store = createStore(rootReducer);

export default store;
