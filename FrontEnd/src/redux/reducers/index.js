import { combineReducers } from 'redux';
import analyticsReducer from './analyticsReducer';
// other reducers

const rootReducer = combineReducers({
  analytics: analyticsReducer,
  // other reducers
});

export default rootReducer;
