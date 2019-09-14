const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.phone = !isEmpty(data.phone) ?  data.phone : '';
    data.bank = !isEmpty(data.bank) ?  data.bank : '';
    data.accountName = !isEmpty(data.accountName) ?  data.accountName : '';
    data.accountNumber = !isEmpty(data.accountNumber) ?  data.accountNumber : '';

    if (Validator.isEmpty(data.bank)) {
        errors.bank = 'Bank name is required!';
    }

    if (Validator.isEmpty(data.accountNumber)) {
        errors.accountNumber = 'Account number is required!';
    }

    if (data.accountNumber.length !== 10) {
        errors.accountNumber = 'Invalid account number!';
    }

    if (!Validator.isLength(data.accountName, { min: 2 })) {
        errors.accountName = 'Invalid account name!';
    }

    if (Validator.isEmpty(data.accountName)) {
        errors.accountName = 'Account name is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};