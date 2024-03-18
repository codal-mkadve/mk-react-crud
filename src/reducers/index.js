// src/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducers';

const rootReducer = combineReducers({
  usersList: userReducer
});

export default rootReducer;
