import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from './types';
import M from 'materialize-css';
import setAuthToken from '../utils/setAuthToken';
export const loginUser = (user) => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
        payload: {}
    });
    axios.post('/api/users/login', user)
        .then(res => {
            M.toast({
                html: 'Logged in successfuly',
                classes: 'toast-valid'
            });

            // Save token to local storage
            const { token } = res.data;
            
            // Set token to local storage
            localStorage.setItem('jwtToken', token);

            // Set token to auth header
            setAuthToken(token);

            // Decode toke to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const registerUser = (user) => (dispatch) => {
    axios.post('/api/users/register', user)
        .then(res => {
            dispatch({
                type: CLEAR_ERRORS,
                payload: {}
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};