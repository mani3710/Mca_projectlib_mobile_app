import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import projectReducer from './project';
import studentReducer from './studentProject';
const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    student: studentReducer
});

export default rootReducer;      