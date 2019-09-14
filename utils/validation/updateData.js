const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ?  data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ?  data.lastName : '';
    data.email = !isEmpty(data.email) ?  data.email : '';
    data.password = !isEmpty(data.password) ?  data.password : '';
    data.phone = !isEmpty(data.phone) ?  data.phone : '';

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

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email address is required!';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }

    if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = 'Invalid Phone Number!';
    }
    if (!Validator.equals(data.phone.length.toString(), '11')) {
        errors.phone = 'Invalid Phone Number!';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone Number is required!';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Please enter your password!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};