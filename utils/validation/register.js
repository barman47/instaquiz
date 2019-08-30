const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ?  data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ?  data.lastName : '';
    data.email = !isEmpty(data.email) ?  data.email : '';
    data.username = !isEmpty(data.username) ?  data.username : '';
    data.password = !isEmpty(data.password) ?  data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ?  data.confirmPassword : '';

    if (!Validator.isLength(data.firstName, { min: 2, max: 15 })) {
        errors.firstName = 'First name must be from 2 to 15 characters long!'
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required!';
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 15 })) {
        errors.lastName = 'Last name must be from 2 to 15 characters long!'
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required!';
    }

    if (!Validator.isLength(data.username, { min: 5, max: 15 })) {
        errors.username = 'Username must be from 5 to 15 characters long!'
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required!';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email address is required!';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }

    if (!Validator.isLength(data.password, { min: 8})) {
        errors.password = 'Password must be at least 8 characters long!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Please confirm your password!';
    }

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords do not match!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};