import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import errorsReducer from './errorsReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    quiz: quizReducer,
    errors: errorsReducer
});