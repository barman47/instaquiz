import { LOAD_QUIZ, SET_QUIZ_LOADING } from '../actions/types';

const initialState = {
    questions: null,
    type: null,
    numberOfQuestions: 0,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_QUIZ:
            return {
                ...state,
                questions: action.payload,
                type: action.payload[0].type,
                numberOfQuestions: action.payload.length,
                loading: false
            };
        
            case SET_QUIZ_LOADING:
                return {
                    ...state,
                    loading: true
                };
        default:
            return state;
    }
};