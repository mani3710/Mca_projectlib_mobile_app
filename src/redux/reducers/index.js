import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import projectReducer from './project';
const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer
});

export default rootReducer;  