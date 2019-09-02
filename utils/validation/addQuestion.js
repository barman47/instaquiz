const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.type = !isEmpty(data.type) ?  data.type : '';
    data.question = !isEmpty(data.question) ?  data.question : '';
    data.optionAText = !isEmpty(data.optionAText) ?  data.optionAText : '';
    data.optionA = !isEmpty(data.optionA) ?  data.optionA : '';
    data.optionB = !isEmpty(data.optionB) ?  data.optionB: '';
    data.optionC = !isEmpty(data.optionC) ?  data.optionC : '';
    data.optionD = !isEmpty(data.optionD) ?  data.optionD : '';
    data.answer = !isEmpty(data.answer) ?  data.answer : '';

    if (Validator.isEmpty(data.type)) {
        errors.type = 'Quiz type is required!';
    }

    if (Validator.isEmpty(data.question)) {
        errors.question = 'Question is required!';
    }

    if (Validator.isEmpty(data.optionA)) {
        errors.optionA = 'Option (A) is required!';
    }

    if (Validator.isEmpty(data.optionB)) {
        errors.optionB = 'Option (B) is required!';
    }

    if (Validator.isEmpty(data.optionC)) {
        errors.optionC = 'Option (C) is required!';
    }
    
    if (Validator.isEmpty(data.optionD)) {
        errors.optionD = 'Option (D) is required!';
    }
    if (Validator.isEmpty(data.answer)) {
        errors.answer = 'Answer is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};