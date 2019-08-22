import { LOAD_QUIZ } from '../actions/types';

const initialState = {
    questions: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_QUIZ:
            return {
                ...state,
                questions: action.payload
            };
        default:
            return state;
    }
};