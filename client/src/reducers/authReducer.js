import { SET_CURRENT_USER, SET_USER_COLOR, PASSWORD_CHANGE_SUCCESSFUL } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    user: {},
    msg: '',
    authenticated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: !isEmpty(action.payload)
            };

        case PASSWORD_CHANGE_SUCCESSFUL:
            return {
                ...state,
                msg: action.payload
            }

        case SET_USER_COLOR:
            return {
                ...state,
                color: action.payload
            };

        default:
            return state;
    }
};