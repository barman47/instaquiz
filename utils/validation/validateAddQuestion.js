const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.type = !isEmpty(data.type) ?  data.type : '';
    data.question = !isEmpty(data.question) ?  data.question : '';
    data.optionAText = !isEmpty(data.optionAText) ?  data.optionAText : '';
    data.optionAAnswer = !isEmpty(data.optionAAnswer) ?  data.optionAAnswer : '';
    data.optionBText = !isEmpty(data.optionBText) ?  data.optionBText : '';
    data.optionBAnswer = !isEmpty(data.optionBAnswer) ?  data.optionBAnswer : '';
    data.optionCText = !isEmpty(data.optionCText) ?  data.optionCText : '';
    data.optionCAnswer = !isEmpty(data.optionCAnswer) ?  data.optionCAnswer : '';
    data.optionDText = !isEmpty(data.optionDText) ?  data.optionDText : '';
    data.optionDAnswer = !isEmpty(data.optionDAnswer) ?  data.optionDAnswer : '';

    if (Validator.isEmpty(data.type)) {
        errors.type = 'Quiz type is required!';
    }

    if (Validator.isEmpty(data.question)) {
        errors.question = 'Question is required!';
    }

    if (Validator.isEmpty(data.optionAText)) {
        errors.optionAText = 'Option (A) is required!';
    }
    if (Validator.isEmpty(data.optionAAnswer)) {
        errors.optionAAnswer = 'Answer is required!';
    }

    if (Validator.isEmpty(data.optionBText)) {
        errors.optionBText = 'Option (B) is required!';
    }
    if (Validator.isEmpty(data.optionBAnswer)) {
        errors.optionBAnswer = 'Answer is required!';
    }
    if (Validator.isEmpty(data.optionCText)) {
        errors.optionCText = 'Option (C) is required!';
    }
    if (Validator.isEmpty(data.optionCAnswer)) {
        errors.optionCAnswer = 'Answer is required!';
    }
    if (Validator.isEmpty(data.optionDText)) {
        errors.optionDText = 'Option (D) is required!';
    }
    if (Validator.isEmpty(data.optionDAnswer)) {
        errors.optionDAnswer = 'Answer is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};