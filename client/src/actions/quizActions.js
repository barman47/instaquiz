import axios from 'axios';
import { LOAD_QUIZ, GET_ERRORS } from '../actions/types';

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