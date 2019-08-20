const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.currentPassword = !isEmpty(data.currentPassword) ?  data.currentPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ?  data.newPassword : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ?  data.confirmPassword : '';

    if (Validator.isEmpty(data.currentPassword)) {
        errors.currentPassword = 'Please provide your password';
    }

    if (!Validator.isLength(data.newPassword, { min: 8})) {
        errors.newPassword = 'Password must be at least 8 characters long!'
    }
    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password is required!';
    }

    if (!Validator.equals(data.newPassword, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords do not match!'
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm your password to continue!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};