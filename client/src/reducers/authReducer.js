import { SET_CURRENT_USER, SET_USER_COLOR } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    user: {},
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

        case SET_USER_COLOR:
            return {
                ...state,
                color: action.payload
            };

        default:
            return state;
    }
};