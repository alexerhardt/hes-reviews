import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import messageReducer from './messageReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  message: messageReducer,
  courses: courseReducer,
});
