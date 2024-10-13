import { combineReducers } from 'redux';
import analyticsReducer from './analyticsReducer';

const rootReducer = combineReducers({
  analytics: analyticsReducer,
  // other reducers
});

export default rootReducer;
