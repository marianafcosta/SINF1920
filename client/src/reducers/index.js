import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import overlayReducer from './overlayReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  overlay: overlayReducer,
});
