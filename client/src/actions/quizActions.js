import axios from 'axios';
import { LOAD_QUIZ, GET_ERRORS, SET_QUIZ_LOADING } from '../actions/types';

export const fetchQuiz = () => dispatch => {
    axios.get('/api/quiz/all')
        .then(res => dispatch({
            type: LOAD_QUIZ,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const getFreeQuestions = () => (dispatch) => {
    dispatch(setQuizLoading());
    axios.get('/api/quiz/getFreeQuiz')
        .then(res => dispatch({
                type: LOAD_QUIZ,
                payload: res.data
            })
        )
        .catch(err => {
            console.error(err);
        });
};

export const setQuizLoading = () => {
    return {
        type: SET_QUIZ_LOADING
    }
};